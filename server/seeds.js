const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
const User = require('./models/user');
const Post = require('./models/post');
const mongoose = require('mongoose');
require('dotenv').config();

// USERS
const createRandomUser = () => {
  const password = faker.internet.password(10);
  return {
    firstName: faker.name.firstName(),
    surname: faker.name.lastName(),
    username: faker.internet.userName(),
    password: bcrypt.hashSync(password, 10),
    passwordReadable: password,
  };
};

// POSTS
const createRandomPost = () => {
  return {
    user: 
  };
};

{
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  text: { type: String },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
},
{ timestamps: true }

// CONNECT TO DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('db connected');

    User.deleteMany({}).then(() => {
      console.log('users collection cleared');
    });

    const user = new User(createRandomUser());
    user.save().then(() => {
      console.log('user saved');
    });
  })
  .catch((err) => console.log(err));

// CLEAR DATABASE

// DISCONNECT FROM DATABASE
// mongoose.disconnect();

// for (let i = 0; i < 10; i++) {
//   const user = new User(createRandomUser());
//   users.push(user);
//   console.log('done');
// }
// User.deleteMany({});
// users.forEach((user) => {
//   user.save();
// });
