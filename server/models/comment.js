const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    text: { type: String },
  },
  { timestamps: true }
);

const comment = mongoose.model('Comment', commentSchema);

module.exports = comment;
