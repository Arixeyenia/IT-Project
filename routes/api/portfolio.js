const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const config = require('config');
const puppeteer = require('puppeteer');

const Portfolio = require('../../models/Portfolio');
const User = require('../../models/User');
const { parseDate } = require('tough-cookie');
const { Redirect } = require('react-router-dom');

/*
The calls to create/edit/delete portfolio 
need to be added here, the following is
temporary for implementing blog and comments
*/

// @route   GET api/portfolio
// @desc    Test route
// @access  Public
router.get('/', async (req, res) => {
  try {
    const portfolio = await Portfolio.find();
    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

// @route   POST api/portfolio
// @desc    Create a portfolio
// @access  Private
router.post(
  '/',
  [auth, [check('name', 'Portfolios must have a name').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPortfolio = new Portfolio({
        name: req.body.name,
        user: req.user.id,
        private: req.body.private,
      });

      const portfolio = await newPortfolio.save();
      res.json(portfolio);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/portfolio/:id
// @desc    Get portfolio by Portfolio ID
// @access  Private
router.get('/single/:id', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ msg: 'Portfolio not found' });
    // check that user is authorized
    if (portfolio.private && portfolio.user.toString() !== req.user.id && !(req.user.id in portfolio.allowedUsers)){ 
      return res.status(401).json({ msg: 'User not authorized' });
    }
    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/portfolio/guest/:id
// @desc    Get portfolio by Portfolio ID for non signed in users
// @access  Public
router.get('/guest/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    if (portfolio.private) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/portfolio/user
// @desc    View all portfolios of a user
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    // Make sure user exists
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const portfolios = await Portfolio.find()
      .where('user')
      .in(req.user.id.toString())
      .sort({ date: -1 })
      .exec();
    
    // return portfolios
    res.json(portfolios);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/portfolio/thumbnail/:id
// @desc    Get thumbnail of portfolio by Portfolio ID
// @access  Private
router.get('/thumbnail/:id', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    if (portfolio.private && portfolio.user.toString() !== req.user.id) {
      if (!(req.user.id in portfolio.allowedUsers)) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    }
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
    });
    //TODO: replace with link to site
    await page.goto(
      'http://localhost:3000/api/portfolio/guest/' + req.params.id
    );
    const image = await page.screenshot();
    await browser.close();
    res.set('Content-Type', 'image/png');
    res.send(image);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/portfolio
// @desc    Remove a portfolio
// @access  Private
router.delete('/delete', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.body.id);
    // check if portfolio exists
    if (!portfolio) return res.status(404).json({ msg: 'Portfolio not found' });
    // check if user is authorized
    if (portfolio.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });
    // perform delete
    await Portfolio.findByIdAndDelete(req.body.id);
    return res.status(202).json({msg: 'Portfolio deleted successfully'});
   } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/portfolio/edit
// @desc    Edit the name or privacy of a portfolio
// @access  Private
router.put('/edit', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.body.portfolio);
    // check if portfolio exists
    if (!portfolio) return res.status(404).json({ msg: 'Portfolio not found' });
    // check if user is authorized
    if (portfolio.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });
    if (req.body.field === "name"){
      res.json(await Portfolio.findByIdAndUpdate(req.body.portfolio, { $set: { name: req.body.value}}, {new : true}));
    }
    else if (req.body.field === "private"){
      res.json(await Portfolio.findByIdAndUpdate(req.body.portfolio, { $set: { private: req.body.value}}, {new : true}));
    }
    else{
      return res.status(422).json({ msg: 'Invalid field parameter' });
    }
   } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    res.status(500).send('Server Error');
  }
});


// @route   POST api/portfolio/permission
// @desc    Give or remove permission to users to view private portfolio
// @access  Private
router.put('/permission', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.body.portfolio);
    // check if portfolio exists
    if (!portfolio) return res.status(404).json({ msg: 'Portfolio not found' });
    // check if user is authorized
    if (portfolio.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });
    if (req.body.add === true){
      res.json(await Portfolio.findByIdAndUpdate(req.body.portfolio, { $push: { allowedUsers: { _id: req.body.user }}}, {new : true}));
    }
    else{
      res.json(await Portfolio.findByIdAndUpdate(req.body.portfolio, { $pull: { allowedUsers: { _id: req.body.user }}}, {new : true}));
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
