const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
  res.send('user route');
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

module.exports = router;
