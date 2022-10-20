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

// GET request to /users to get all the users
router.get('/', jwtAuth, async (req, res) => {
  // want to exclude the current user from being able to add themselves, fairly sure this leads to race condition errors later down the line
  // also creating friends array for the signed in user which we user to filter the suggested friends by making sure we don't suggest users who are already friends
  const friends = req.user.friends.map((friend) => {
    return friend._id;
  });
  const friendRequests = req.user.friendRequests.map((friendRequest) => {
    return friendRequest._id;
  });
  const users = await User.find({
    $and: [
      { _id: { $ne: req.user._id } },
      { _id: { $nin: friends } },
      { _id: { $nin: friendRequests } },
    ],
  });
  console.log('request recived for all users');
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
  User.findOne({ _id: req.user._id })
    .populate('friendRequests')
    .exec((err, user) => {
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
                .then(() =>
                  user.save().then(() => {
                    User.findOne({ _id: req.user._id })
                      .populate('friendRequests')
                      .exec((err, user) => {
                        console.log(user);
                        res.json(user);
                      });
                  })
                );
            });
        });
    });
});

// PATCH request to /users/addFriend/:id to add the requesting user onto the requested user's list of friends
router.patch('/addFriend/:id', jwtAuth, async (req, res) => {
  const requestingUser = await User.findOne({ _id: req.user._id });
  const requestedUser = await User.findOne({ _id: req.params.id });
  requestedUser.friendRequests.push(requestingUser);
  requestingUser.requestsSent.push(requestedUser);
  await requestedUser.save();
  await requestingUser.save();
  // have to refind the user after saving so we can send back to react requested users as a list of object ids, so we can use them for checking whether or not a request has been sent
  const userToSendBack = await User.findOne({
    _id: req.user._id,
  }).populate('friendRequests');
  res.json(userToSendBack);
  console.log(userToSendBack);
});

// PATCH request to /users/acceptFriend/:id to accept the friend request
router.patch('/acceptFriend/:id', jwtAuth, async (req, res) => {
  const acceptingUser = await User.findOne({ _id: req.user._id });
  // getting this from the request URL because we set it as a data-value in react
  const acceptedUser = await User.findOne({ _id: req.params.id });
  // filter the array to remove any requests which the user has just accepted
  const filteredArr = acceptingUser.friendRequests.filter(
    (friendRequest) =>
      JSON.stringify(friendRequest._id) !== JSON.stringify(acceptedUser._id)
  );
  acceptingUser.friendRequests = filteredArr;
  acceptingUser.friends.push(acceptedUser);
  acceptedUser.friends.push(acceptingUser);
  await acceptedUser.save();
  try {
    await acceptingUser.save();
  } catch (err) {
    console.error(err);
  }
  // have to refind the user after changing their list of friend requests and then send this back to react so it can update what it has in local storage
  const userToSendBack = await User.findOne({
    _id: req.user._id,
  })
    .populate('friendRequests')
    .populate('friends');
  res.json(userToSendBack);
});

module.exports = router;

// acceptingUser.friendRequests.filter(
//   (friendRequest) => friendRequest._id !== acceptedUser._id
// );
