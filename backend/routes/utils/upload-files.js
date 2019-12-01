const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    const extension = file.originalname.split('.')[1];
    cb(null, req.params.messageid + '.' + extension);
  }
});

module.exports = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
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
