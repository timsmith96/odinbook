const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const home = require('./routes/home');

const app = express();

// connect to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to db'))
  .catch((err) => console.log(err));

app.use('/home', home);

app.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`)
);
