const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
  console.log(req.body);
  User.findOne({ username: req.body.username }, (err, user) => {
    // couldn't find user
    if (!user) {
      return res.status(401).json('user not found - please try again');
    }
    // could find user
    user.checkPassword(req.body.password).then((data) => {
      // passwords match - have a token
      if (data) {
        jwt.sign({ user }, process.env.JWT_KEY, (err, token) => {
          res.json({
            token,
          });
        });
      } else {
        // passwords don't match
        return res.status(401).json('password incorrect - please try again');
      }
    });
  });
});

module.exports = router;
