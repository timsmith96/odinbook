const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const { body } = require('express-validator');
const jwtAuth = require('../middleware/auth');
const upload = require('../middleware/multer');

// post route to /posts in order to create a new post
router.post(
  '/',
  jwtAuth,
  upload.single('image'),
  body('text').trim(),
  (req, res) => {
    console.log(req.file.buffer);
    console.log(req.body.text);
    // user has been added to request obj by the jwtAuth middleware
    const { user } = req.user;
    // creating the post
    const post = new Post({
      user: user._id,
      text: req.body.text,
    });
    // saving the post to db then sending the post as json to client
    post.save().then((post) => {
      return res.json(post);
    });
  }
);

module.exports = router;
