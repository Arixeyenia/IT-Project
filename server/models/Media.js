const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: 'user',
  },
  file: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Media = mongoose.model('media', MediaSchema);
