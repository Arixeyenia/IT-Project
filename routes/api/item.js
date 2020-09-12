const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const config = require('config');

const Portfolio = require('../../models/Portfolio');
const User = require('../../models/User');
const Item = require('../../models/Item');
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

// @route   POST api/item
// @desc    Adds an item to a page of a portfolio
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    // retrieve portfolio
    const portfolio = await Portfolio.findById(req.body.portfolio);
    // Check portfolio exists
    if (!portfolio) return res.status(404).json({ msg: 'Portfolio not found' });
    // Check user permission
    if (portfolio.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });
    // Check page exists and TODO: row/column make sense
    const page = portfolio.pages.filter(page => page.url === encodeURI(req.body.pagename));
    if (page.length === 0) res.status(404).json({msg: 'Page not found'});
    const newItem = new Item({
      portfolio: portfolio.id,
      pageid: page[0].id,
      private: req.body.private,
      title: req.body.title,
      subtitle: req.body.subtitle,
      paragraph: req.body.paragraph,
      mediaLink: req.body.mediaLink,
      mediaType: req.body.mediaType,
      linkText: req.body.linkText,
      linkAddress: req.body.linkAddress,
      row: req.body.row,
      column: req.body.column,
    });
    const item = await newItem.save();
    const update = {$push: { "pages.$[elem].items": item}};
    const options =  {new : true, arrayFilters : [{ 'elem._id': page[0]._id }]};
    const result = await Portfolio.findByIdAndUpdate( req.body.portfolio, update, options);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/item
// @desc    Edits an existing item
// @access  Private
router.put('/', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.body.item);
    // retrieve portfolio
    const portfolio = await Portfolio.findById(item.portfolio);
    // Check portfolio exists
    if (!portfolio) return res.status(404).json({ msg: 'Portfolio not found' });
    // Check user permission
    if (portfolio.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });
    updates = {};
    // TODO validate row and column
    if (req.body.private!==null) updates.private = req.body.private;
    if (req.body.title!==null) updates.title = req.body.title;
    if (req.body.subtitle!==null) updates.subtitle = req.body.subtitle;
    if (req.body.paragraph!==null) updates.paragraph = req.body.paragraph;
    if (req.body.mediaLink!==null) updates.mediaLink = req.body.mediaLink;
    if (req.body.mediaType!==null) updates.mediaType = req.body.mediaType;
    if (req.body.linkText!==null) updates.linkText = req.body.linkText;
    if (req.body.linkAddress!==null) updates.linkAddress = req.body.linkAddress;
    if (req.body.row!==null) updates.row = req.body.row;
    if (req.body.column!==null) updates.column = req.body.column;
    res.json(await Item.findByIdAndUpdate(req.body.item, {$set: updates}, {new:true}));
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/item
// @desc    Deletes an existing item
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.body.item);
    // retrieve portfolio
    const portfolio = await Portfolio.findById(item.portfolio);
    // Check portfolio exists
    if (!portfolio) return res.status(404).json({ msg: 'Portfolio not found' });
    // Check user permission
    if (portfolio.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });
    await Item.findByIdAndDelete(req.body.item);
    return res.status(202).json({msg: 'Item deleted successfully'});
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/item/:id
// @desc    Get a single item by its id TEST ROUTE
// @access  Private
router.get('/:id', auth, async (req, res) => {
    // retrieve portfolio
    const item = await Item.findById(req.params.id);
    res.json(item);
});

module.exports = router;
