const mongoose = require('mongoose');

/* 
Item Schema
*/
const ItemSchema = new mongoose.Schema({
  portfolio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'portfolio',
  },
  row: {
    type: Number,
  },
  column: {
    type: Number,
  },
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  paragraph: {
    type: String,
  },
  media: {
    type: String,
  },
  link: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  private: {
    type: Boolean,
    default: false,
  },
});

module.exports = Item = mongoose.model('item', ItemSchema);
