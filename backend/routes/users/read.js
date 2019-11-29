const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/user');

/**
 * @method - POST
 * @url - '/api/users/signin'
 * @data - { email, password }
 * @action - signin an existing user
 * @access - public
 */
router.post(
  '/signin',
  [
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findByCredentials(email, password);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User does not exists' }] });
      }

      const token = await user.generateAuthToken();

      res.json({ user, token });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

/**
 * @method - GET
 * @url - '/api/users/auth'
 * @data - token header
 * @action - get current user data
 * @access - private
 */
router.get('/auth', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User does not exists' }] });
    }

    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - '/api/users/avatar/:userid'
 * @data - No data
 * @action - serving user avatar
 * @access - public
 */
router.get('/avatar/:userid', async (req, res) => {
  try {
    const user = await User.findById(req.params.userid);

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User does not exists' }] });
    }

    res.set('Content-Type', 'image/jpg');
    res.send(user.avatar);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - '/api/users/allusers'
 * @data - nothing
 * @action - get all users
 * @access - private
 */
router.get('/allusers', auth, async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user._id },
      deleted: { $exists: false }
    });

    res.json({ users });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
