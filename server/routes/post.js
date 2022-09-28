const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const { body, validationResult } = require('express-validator');

router.post('/', body('post').trim(), (req, res) => {
  const post = new Post({});
});

module.exports = router;
