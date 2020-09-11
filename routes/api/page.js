const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');

const Portfolio = require('../../models/Portfolio');
const User = require('../../models/User');
const Item = require('../../models/Item');

/*
The calls to create/edit/delete pages in a portfolio
*/

// @route   GET api/item
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('pages route'));

// @route   POST api/page
// @desc    Create an new page on a portfolio 
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.body.portfolio);
    // check if portfolio exists
    if (!portfolio) return res.status(404).json({ msg: 'Portfolio not found' });
    // check if user is authorized
    if (portfolio.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });
    // make page name urlsafe
    const url = encodeURI(req.body.name);
    if (portfolio.pages.filter(page => page.url === url).length > 0) {
      res.status(409).json({msg: 'Page with this name already exists'});
    }
    else{
      res.json(await Portfolio.findByIdAndUpdate(req.body.portfolio, { $push: { pages: { name: req.body.name, url: url }}}, {new : true}));
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/page
// @desc    Remove a page from a portfolio 
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.body.portfolio);
    // check if portfolio exists
    if (!portfolio) return res.status(404).json({ msg: 'Portfolio not found' });
    // check if user is authorized
    if (portfolio.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });
    // retrieve id, assume no duplicate page
    const page = portfolio.pages.filter(page => page.url === encodeURI(req.body.name));
    // TODO : remove associated items
    res.json(await Portfolio.findByIdAndUpdate(req.body.portfolio, { $pull: { pages: {_id : page[0]._id}}}, {new : true}));
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   put api/page
// @desc    Edits the name of a page on a portfolio 
// @access  Private
router.put('/', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.body.portfolio);
    // check if portfolio exists
    if (!portfolio) return res.status(404).json({ msg: 'Portfolio not found' });
    // check if user is authorized
    if (portfolio.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });
    // make page name urlsafe
    const url = encodeURI(req.body.oldname);
    // retrieve id, assume no duplicate page
    const page = portfolio.pages.filter(page => page.url === url);
    // check new name does not clash
    if (portfolio.pages.filter(page => page.url === encodeURI(req.body.newname)).length > 0) {
      res.status(409).json({msg: 'Page with this name already exists'});
    }
    else if (page.length === 0) {
      res.status(404).json({msg: 'Page not found'});
    }
    else{
      const update = {$set: { "pages.$[elem].name": req.body.newname, "pages.$[elem].url": encodeURI(req.body.newname)}};
      const options =  {new : true, arrayFilters : [{ 'elem._id': page[0]._id }]};
      res.json(await Portfolio.findByIdAndUpdate( req.body.portfolio, update, options));
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
