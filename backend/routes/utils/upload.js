const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|gif|jpeg)$/i)) {
      // $ = end of name
      // i = case insensitive
      return cb(new Error('Please upload an image file'));
    }

    cb(undefined, true);
  }
});

module.exports = upload;
