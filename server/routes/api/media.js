const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const config = require('config');

const Portfolio = require('../../models/Portfolio');
const User = require('../../models/User');
const Item = require('../../models/Item');
const Media = require('../../models/Media');
const { parseDate } = require('tough-cookie');

const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { initStorage, initUpload } = require('../../modules/multerModule');

const conn = mongoose.connection;
Grid.mongo = mongoose.mongo;

//Init gfs
let gfs;

const collectionName = 'media';
const bucketName = 'media';

conn.once('open', () => {
  gfs = Grid(conn.db);
  gfs.collection(collectionName);
});

const storage = initStorage(conn, bucketName);
const upload = initUpload(storage);

// @route   GET api/media
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Media route'));

// @route   POST api/media
// @desc    Upload a media file to database
// @access  Private

// @route   GET api/media/:filename
// @desc    Get contents of file
// @access  Private

module.exports = router;
