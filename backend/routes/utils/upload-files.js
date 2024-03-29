const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const s3 = new aws.S3({ region: 'ap-south-1' });

const bucketName = `${process.env.S3_BUCKET_NAME}/${
  process.env.NODE_ENV === 'production' ? 'shared-images' : 'shared-images-test'
}`;

const storage = multerS3({
  s3,
  bucket: bucketName,

  acl: 'public-read',
  metadata: function(req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function(req, file, cb) {
    // :filename is expected with the request
    cb(null, req.params.filename);
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
