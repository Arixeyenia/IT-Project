const mongoose = require('mongoose');

/* 
Temporary Portfolio Schema
More stuff will be added, for now it just has a user
id as a referance, date and a list of blog posts
*/
const PortfolioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  blog: [
    {
      title: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  private: {
    type: Boolean,
    default: false,
  },
  allowedUsers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    },
  ],
  thumbnailURL: {
    type: String,
  },
});

module.exports = Portfolio = mongoose.model('portfolio', PortfolioSchema);
