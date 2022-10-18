const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const upload = require('../middleware/multer');
const bcrypt = require('bcryptjs');
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');
const sharp = require('sharp');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const crypto = require('crypto');
const jwtAuth = require('../middleware/auth.js');
// const { constants } = require('buffer');

const randomImageName = (bytes = 32) => {
  return crypto.randomBytes(bytes).toString('hex');
};

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

router.get('/', jwtAuth, async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const titleCase = (str) => {
  return str[0].toUpperCase() + str.slice(1, str.length);
};

// post request to /users to create a new user
router.post(
  '/',
  body('firstName').trim(),
  body('surname').trim(),
  body('username')
    .trim()
    .isAlphanumeric()
    .withMessage('Username to contain only numbers and letters please')
    .custom((value) => {
      return User.findOne({ username: value }).then((user) => {
        if (user) {
          return Promise.reject('Username already in use, please try another');
        }
      });
    }),
  body('password')
    .isAlphanumeric()
    .withMessage('No spaces in password please')
    .isLength({ min: 5 })
    .withMessage('password must be at least 5 characters long please'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.create({
      firstName: titleCase(req.body.firstName),
      surname: titleCase(req.body.surname),
      username: req.body.username.toLowerCase(),
      password: bcrypt.hashSync(req.body.password, 10),
    });
    return res.json(user);
  }
);

// PATCH request to user to add a new profile image
router.patch('/:id', jwtAuth, upload.single('image'), (req, res) => {
  console.log('req.user.user._id = ', req.user.user._id);
  User.findOne({ _id: req.user.user._id }).then((user) => {
    const imageName = randomImageName();
    console.log(req.file);
    sharp(req.file.buffer)
      .resize({ height: 200, width: 200, fit: 'cover' })
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
        user.profileImageName = imageName;
        user
          .save()
          .then(() => console.log('saved the user after part 1'))
          // once we've saved the user we go and get the image url from s3 and add this to the user object which we then return in the json response to react
          .then(() => {
            const getObjectParams = {
              Bucket: bucketName,
              Key: user.profileImageName,
            };
            const command = new GetObjectCommand(getObjectParams);
            getSignedUrl(s3, command)
              .then((url) => {
                user.imageUrl = url;
              })
              .then(() => user.save().then((user) => res.json(user)));
          });
      });
  });
});

// PATCH request to /users/addFriend/:id to add the requesting user onto the requested user's list of friends
router.patch('/addFriend/:id', jwtAuth, async (req, res) => {
  console.log(req.user);
  const requestingUser = await User.findOne({ _id: req.user.user._id });
  const requestedUser = await User.findOne({ _id: req.params.id });
  requestedUser.friendRequests.push(requestingUser);
  requestedUser.save();
  res.send(requestedUser);
});

module.exports = router;
