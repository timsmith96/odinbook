const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    text: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
  },
  { timestamps: true }
);

const comment = mongoose.model('Comment', commentSchema);

module.exports = comment;
