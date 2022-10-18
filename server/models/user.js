const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    likedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    password: { type: String, required: true },
    passwordReadable: { type: String, required: false },
    profileImageName: { type: String, required: false },
    imageUrl: { type: String, required: false },
  },
  { timestamps: true }
);

userSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }
      resolve(same);
    });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
