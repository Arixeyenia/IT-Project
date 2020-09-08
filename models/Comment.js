const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
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
});

module.exports = Item = mongoose.model('item', ItemSchema);
