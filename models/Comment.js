const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'item',
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  modified: {
    type: Boolean,
    default: false,
  },
});

module.exports = Comment = mongoose.model('comment', CommentSchema);
