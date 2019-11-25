const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const axios = require('axios');

module.exports = async (req, res, next) => {
  try {
    const type = req.header('Authorization').split(' ')[0];
    console.log('auth type', type);

    let token, user, response;

    switch (type) {
      case 'Bearer':
        token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        user = await User.findOne({
          _id: decoded._id,
          'tokens.basic_token': token
        });

        if (!user) {
          throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
        break;

      case 'Facebook':
        token = req.header('Authorization').replace('Facebook ', '');

        response = await axios({
          method: 'GET',
          url: 'https://graph.facebook.com/me',
          params: { fields: 'email', access_token: token }
        });

        user = await User.findOne({
          email: response.data.email,
          'tokens.facebook_token': token
        });

        if (!user) {
          throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
        break;

      case 'Google':
        token = req.header('Authorization').replace('Google ', '');

        response = await axios({
          method: 'GET',
          url: 'https://www.googleapis.com/oauth2/v1/userinfo',
          params: { access_token: token }
        });

        user = await User.findOne({
          email: response.data.email,
          'tokens.google_token': token
        });

        if (!user) {
          throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
        break;
    }
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};
