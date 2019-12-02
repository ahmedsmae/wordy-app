const multer = require('multer');
var multerS3 = require('multer-s3');
var aws = require('aws-sdk');

var s3 = new aws.S3({ region: 'ap-south-1' });

const storage = multerS3({
  s3,
  bucket: process.env.S3_BUCKET_NAME,

  acl: 'public-read',
  metadata: function(req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function(req, file, cb) {
    // :filename is expected with the request
    console.log(file);
    console.log(req.params);

    const extension = file.originalname.split('.')[1];
    cb(null, req.params.filename + '.' + extension);
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
