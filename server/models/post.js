const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    text: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

const post = mongoose.model('Post', postSchema);

module.exports = post;
