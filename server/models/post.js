const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    text: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', required: true }],
    imageName: { type: String, required: false },
    imageUrl: { type: String, required: false },
  },
  { timestamps: true }
);

const post = mongoose.model('Post', postSchema);

module.exports = post;
