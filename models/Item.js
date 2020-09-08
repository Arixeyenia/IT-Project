const mongoose = require('mongoose');

/* 
Temporary Item Schema
It just has a portfolio ID as a referance,
date, and private (default set to false)
*/
const ItemSchema = new mongoose.Schema({
  portfolio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'portfolio',
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
