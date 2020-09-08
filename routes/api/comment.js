const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const config = require('config');

const Portfolio = require('../../models/Portfolio');
const User = require('../../models/User');
const Item = require('../../models/Item');
const Comment = require('../../models/Comment');
const { parseDate } = require('tough-cookie');

// @route   GET api/comment
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Comment route'));

// @route   POST api/comment/:item_id
// @desc    Leave a comment on an item
// @access  Private
router.post(
  '/:item_id',
  [auth, [check('text', 'Cannot leave empty comment').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Pull out item and user
      const item = await Item.findById(req.params.item_id);
      const user = await User.findById(req.user.id).select('-password');

      // Make sure item post exists
      if (!item) {
        return res.status(404).json({ msg: 'Item does not exist' });
      }

      const newComment = new Comment({
        from: req.user.id,
        name: user.name,
        item: req.params.item_id,
        text: req.body.text,
      });

      const comment = await newComment.save();
      res.json(comment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/comment/:item_id
// @desc    View comment on an item
// @access  Public

// @route   DELETE api/comment/:comment_id
// @desc    Remove a comment (commenter & receiver)
// @access  Private

// @route   POST api/comment/:comment_id
// @desc    Edit a comment (only commenter) makes modified true
// @access  Private

module.exports = router;
