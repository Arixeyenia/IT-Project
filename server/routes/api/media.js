const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const config = require('config');

const Portfolio = require('../../models/Portfolio');
const User = require('../../models/User');
const Item = require('../../models/Item');
const { parseDate } = require('tough-cookie');

const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { initStorage } = require('../../modules/multerModule');

const conn = mongoose.connection;
Grid.mongo = mongoose.mongo;

//Init gfs
let gfs;

const collectionName = 'uploads';
const bucketName = 'uploads';

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection(collectionName);
});

const storage = initStorage(conn, bucketName);
const upload = multer({ storage });

// @route   GET api/media
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Media route'));

// @route   POST api/media
// @desc    Upload a media file to database returns json that includes filename
// @access  Private
router.post('/', [auth, upload.single('file')], (req, res) => {
  //res.json({ file: req.file });
  res.redirect('/');
});

// @route   GET api/media/:filename
// @desc    Get file object, similar to what is returned when new file is posted
// @access  Private
router.get('/:filename', auth, (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists',
      });
    }
    // File exists
    return res.json(file);
  });
});

// @route   GET api/media/image/:filename
// @desc    Display Image
// @access  Public
router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists',
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image',
      });
    }
  });
});

// @route   DELETE api/media/:id
// @desc    Delete File
// @access  Private
router.delete('/:id', auth, (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }

    res.redirect('/');
  });
});

module.exports = router;