const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes/index');
const User = require('./models/user');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { S3Client } = require('@aws-sdk/client-s3');

const app = express();

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

// middlewear
app.use(cookieParser());

app.use(async (req, res, next) => {
  req.context = {
    User,
  };
  next();
});

// const verifyToken = (req, res, next) => {
//   const bearerToken = req.headers['authorization'];
//   if (typeof bearerToken !== 'undefined') {
//     req.token = bearerToken;
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// };

app.use(cors({ credentials: true, origin: 'http://localhost:3001' }));

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
