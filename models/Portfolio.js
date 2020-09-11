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
  pages: [
   {
     name: {
       type: String,
       required: true,
     },
     url: {
      type: String,
      required: true,
     },
     items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'item',
        },
      },
     ],
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
});

module.exports = Portfolio = mongoose.model('portfolio', PortfolioSchema);
