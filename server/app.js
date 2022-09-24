const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes/index');
const User = require('./models/user');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// middlewear
app.use(async (req, res, next) => {
  req.context = {
    User,
  };
  next();
});

app.use(cors());

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

console.log(User);

app.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`)
);
