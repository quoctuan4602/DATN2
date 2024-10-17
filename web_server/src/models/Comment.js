const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    filmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Film',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    commentTxt: { type: String, required: true },
  },
  { timestamps: true },
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
