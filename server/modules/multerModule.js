// Source: https://github.com/wiktorkujawa/travel-agency-page

const path = require('path');
const multer = require('multer');
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');

// Create storage engine
const initStorage = (conn, bucketName) =>
  new GridFsStorage({
    db: conn,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename =
            buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: bucketName,
          };
          resolve(fileInfo);
        });
      });
    },
  });

module.exports = { initStorage };
