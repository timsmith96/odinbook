const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment');
const { body } = require('express-validator');
const jwtAuth = require('../middleware/auth');
const upload = require('../middleware/multer');
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');
const crypto = require('crypto');
const sharp = require('sharp');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString('hex');

const bucketRegion = process.env.BUCKET_REGION;
const bucketName = process.env.BUCKET_NAME;
const awsAccessKey = process.env.AWS_ACCESS_KEY;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretAccessKey,
  },
  region: bucketRegion,
});

// post route to /posts in order to create a new post
router.post(
  '/',
  jwtAuth,
  upload.single('image'),
  body('text').trim(),
  (req, res) => {
    // user has been added to request obj by the jwtAuth middleware
    const { user } = req.user;
    // creating the post
    const post = new Post({
      user: user._id,
      text: req.body.text,
    });
    // if there is an image sent with the request, do the image stuff
    if (req.file !== undefined) {
      console.log('image present');
      // resize image
      const imageName = randomImageName();
      sharp(req.file.buffer)
        .resize({
          height: 510,
          width: 680,
          fit: 'contain',
        })
        .toBuffer()
        // saving to s3 bucket
        .then((data) => {
          const params = {
            Bucket: bucketName,
            Key: imageName,
            Body: data,
            ContentType: req.file.mimetype,
          };
          const command = new PutObjectCommand(params);
          s3.send(command);
          post.imageName = imageName;
          post.save().then((post) => {
            return res.json(post);
          });
        })
        .catch((err) => console.log(err));
      // if there is no image sent with the request, just save to db
    } else {
      post.save().then((post) => {
        return res.json(post);
      });
    }
  }
);

// GET request to /posts to get all the posts and handle images as well
router.get('/', async (req, res) => {
  // get all the posts
  const posts = await Post.find({})
    // initial populating, can't populate user within comments here, have to do it after this call it seems
    .populate('user')
    .populate('likes')
    .populate('comments');
  // loop through posts and add s3 url to each post
  for (const post of posts) {
    await post.populate('comments.user');
    if (post.imageName !== undefined) {
      // so we do it here
      const getObjectParams = {
        Bucket: bucketName,
        Key: post.imageName,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command);
      post.imageUrl = url;
    }
  }
  return res.json(posts);
});

// PATCH request to /post/:id for a user to like a post or add a new comment, depending on which headers the client sends with the request
router.patch('/:id', jwtAuth, async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id }).populate('likes');
  // if the request wants to add a comment
  if (req.headers.comments === 'true') {
    const comment = new Comment({
      user: req.user.user._id,
      text: req.body.text,
    });
    await comment.save();
    post.comments.push(comment);
    await post.save();
    // this populates both the comments and the users within comments on a post
    const toSend = await Post.findOne({ _id: req.params.id }).populate({
      path: 'comments',
      options: { sort: { createdAt: -1 } },
    });
    await toSend.populate('comments.user');
    return res.json(toSend.comments);
  }
  // if the post is already liked - sending this from state in react
  if (req.headers.liked === 'true') {
    console.log('post already liked - unliking');
    // removing the user from the post's array of likes
    const updatedLikes = post.likes.filter(
      (user) => user.id !== req.user.user._id
    );
    // updating the post's likes array to the filtered array
    post.likes = updatedLikes;
    await post.save();
  } else {
    console.log('post not liked - liking');
    // user wants to like post - push user object to post's array of likes
    post.likes.push(req.user.user);
    await post.save();
  }
  return res.json(post.likes);
});

module.exports = router;
