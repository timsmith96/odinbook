const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes/index');
const User = require('./models/user');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const jwtAuth = require('./middleware/auth');

const app = express();

// middlewear
app.use(cookieParser());

app.use(async (req, res, next) => {
  req.context = {
    User,
  };
  next();
});

app.use(
  cors({
    credentials: true,
    origin: 'https://cryptic-wave-65159.herokuapp.com/',
  })
);

app.use(bodyParser.json());

// connect to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to db'))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.redirect('/home'));
app.use('/home', routes.home);
app.use('/users', routes.user);
app.use('/login', routes.login);
app.use('/posts', routes.post);
// jwtAuth adds the user to the request object, then we can send it in the response to react
app.get('/userplease', jwtAuth, (req, res) => {
  User.findOne({ _id: req.user.user._id })
    .populate('friendRequests')
    .then((user) => res.json(user));
});

app.get('/hidden', (req, res) => {
  jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        authData,
      });
    }
  });
});

app.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`)
);
