const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const config = require('config');

const Portfolio = require('../../models/Portfolio');
const User = require('../../models/User');
const { parseDate } = require('tough-cookie');

/*
The calls to create/edit/delete items 
need to be added here, the following is
temporary for implementing blog
*/

// @route   GET api/item
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Item route'));

// @route   POST api/item/:id
// @desc    Create an item for portfolio with :id
// @access  Private
router.post('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const portfolio = await Portfolio.findById(req.params.id);

    // Check user
    if (portfolio.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const newItem = new Item({
      portfolio: portfolio.id,
    });

    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
