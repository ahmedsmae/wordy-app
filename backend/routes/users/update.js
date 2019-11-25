const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const auth = require('../utils/auth');
const upload = require('../utils/upload');
const { check, validationResult } = require('express-validator');

const User = require('../../models/user');

/**
 * @method - PATCH
 * @url - '/api/users/updateinfo'
 * @data - { name, status }
 * @action - update user info
 * @access - private
 */
router.get(
  '/updateinfo',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, status } = req.body;

    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User does not exists' }] });
      }

      user.name = name;
      user.status = status;

      await user.save();

      res.json({ user });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: [{ msg: err.message }] });
    }
  }
);

/**
 * @method - POST
 * @url - '/api/users/updateavatar'
 * @data - { file }
 * @action - update user avatar
 * @access - private
 */
router.post(
  '/updateavatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User does not exists' }] });
      }

      const buffer = await sharp(req.file.buffer)
        .resize({ width: 250, height: 250 })
        .png()
        .toBuffer();

      user.avatar = buffer;

      await user.save();

      res.json({ user });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

module.exports = router;
