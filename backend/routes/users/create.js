const express = require('express');
const axios = require('axios');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const ObjectId = require('mongodb').ObjectID;

const User = require('../../models/user');

/**
 * @method - POST
 * @url - '/api/users/signup'
 * @data - { name, email, password }
 * @action - create new user
 * @access - public
 */
router.post(
  '/signup',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required')
      .not()
      .isEmpty(),
    check(
      'password',
      'Please enter a password with 7 or more characters'
    ).isLength({ min: 7 }),
    check('password', 'password cannot contains the word "password"')
      .isLowercase()
      .not()
      .contains('password')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Email already exists' }] });
      }

      user = new User({
        name,
        email,
        password,
        sign_in_method: 'EMAIL/PASSWORD'
      });
      await user.save();
      const token = await user.generateAuthToken();
      res.json({ user, token });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

/**
 * @method - POST
 * @url - '/api/users/signinwithfacebook'
 * @data - facebook token header
 * @action - create new user
 * @access - public
 */
router.post('/signinwithfacebook', async (req, res) => {
  try {
    const fb_token = req.header('Authorization').replace('Facebook ', '');
    const response = await axios({
      method: 'GET',
      url: 'https://graph.facebook.com/me',
      params: {
        fields: 'id,name,email,picture.type(large)',
        access_token: fb_token
      }
    });
    const { email, id, name, picture } = response.data;

    const imageUrl = picture.data.url;

    let user = await User.findOne({ email });

    if (user) {
      console.log('updating facebook token');
      user.tokens.facebook_token = fb_token;
      user.name = name;
      user.image_url = imageUrl;
    } else {
      console.log('create new facebook user');
      user = new User({
        name,
        email,
        image_url: imageUrl,
        sign_in_method: 'FACEBOOK',
        'tokens.facebook_token': fb_token
      });
    }

    await user.save();
    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - POST
 * @url - '/api/users/signinwithgoogle'
 * @data - google token header, user: {id, name, email, photoUrl}
 * @action - create new user
 * @access - public
 */
router.post('/signinwithgoogle', async (req, res) => {
  try {
    const google_token = req.header('Authorization').replace('Google ', '');

    const response = await axios({
      method: 'GET',
      url: 'https://www.googleapis.com/oauth2/v1/userinfo',
      params: { access_token: google_token }
    });
    const { email, id, name, picture } = response.data;

    let user = await User.findOne({ email });

    if (user) {
      console.log('updating google token');
      user.tokens.google_token = google_token;
      user.name = name;
      user.image_url = picture;
    } else {
      console.log('create new google user');
      user = new User({
        name,
        email,
        image_url: picture,
        sign_in_method: 'GOOGLE',
        'tokens.google_token': google_token
      });
    }

    await user.save();
    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
