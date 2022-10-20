const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
  User.findOne({ username: req.body.username.toLowerCase() })
    .populate('friendRequests')
    .populate('friends')
    .exec((err, user) => {
      console.log(err);
      console.log(user);
      // couldn't find user
      if (!user) {
        return res.status(401).json('user not found - please try again');
      }
      // could find user
      user.checkPassword(req.body.password).then((data) => {
        // passwords match - have a token - added to cookies
        if (data) {
          const token = jwt.sign({ user }, process.env.JWT_KEY, {
            expiresIn: '1d',
          });
          console.log(user);
          return res.json({ user, token });
        } else {
          // passwords don't match
          return res.status(401).json('password incorrect - please try again');
        }
      });
    });
});

module.exports = router;
