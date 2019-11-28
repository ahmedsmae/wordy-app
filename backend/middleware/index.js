const cors = require('cors');
const compression = require('compression');
const enforce = require('express-sslify');

module.exports = function(app) {
  app.use(compression());
  app.use(cors());

  if (process.env.NODE_ENV === 'production') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
  }
};
