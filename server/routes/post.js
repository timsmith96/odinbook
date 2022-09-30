const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const { body } = require('express-validator');
const jwtAuth = require('../middleware/auth');
const upload = require('../middleware/multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');
const sharp = require('sharp');

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
    const imageName = randomImageName();
    // resize image
    sharp(req.file.buffer)
      .resize({
        height: 200,
        width: 200,
        fit: 'cover',
      })
      .toBuffer()
      .then((data) => {
        const params = {
          Bucket: bucketName,
          Key: imageName,
          Body: data,
          ContentType: req.file.mimetype,
        };
        const command = new PutObjectCommand(params);
        s3.send(command);
      })
      .catch((err) => console.log(err));

    // user has been added to request obj by the jwtAuth middleware
    const { user } = req.user;
    // creating the post
    const post = new Post({
      user: user._id,
      text: req.body.text,
      imageName: imageName,
    });
    // saving the post to db then sending the post as json to client
    post.save().then((post) => {
      return res.json(post);
    });
  }
);

module.exports = router;
