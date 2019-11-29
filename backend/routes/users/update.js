const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const auth = require('../utils/auth');
const upload = require('../utils/upload');
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const passwordGenerator = require('generate-password');

const User = require('../../models/user');
const {
  MAILING_ADDRESS,
  MAILING_HOST,
  MAILING_SERVICE,
  APP_NAME
} = require('../../constants/constants');

/**
 * @method - PATCH
 * @url - '/api/users/updateinfo'
 * @data - { name, status }
 * @action - update user info
 * @access - private
 */
router.patch(
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
 * @method - PATCH
 * @url - '/api/users/changepassword'
 * @data - { oldPassword, newPassword }
 * @action - get the user, change his password with the new one and delete all his tokens
 * @access - private
 */
router.patch(
  '/changepassword',
  [
    auth,
    [
      check('oldPassword', 'Old password is required')
        .not()
        .isEmpty(),
      check('newPassword', 'New password is required')
        .not()
        .isEmpty(),
      check(
        'newPassword',
        'Please enter a new password with 7 or more characters'
      ).isLength({ min: 7 }),
      check('newPassword', 'New password cannot contains the word "password"')
        .isLowercase()
        .not()
        .contains('password')
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { oldPassword, newPassword } = req.body;

    try {
      const user = await User.findByCredentials(req.user.email, oldPassword);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // set password to user
      user.password = newPassword;

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
 * @url - '/api/users/forgetpassword'
 * @data - { email }
 * @action - check for email existance, generate new password,
 *           set it to this user and mail it to his email and delete all user tokens
 * @access - public
 */
router.post(
  '/forgetpassword',
  [
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'No user with this email' }] });
      }

      // generate new password
      const newPassword = passwordGenerator.generate({
        length: 10,
        numbers: true,
        uppercase: true
      });

      let transporter = nodemailer.createTransport({
        host: MAILING_HOST,
        port: 465,
        service: MAILING_SERVICE,
        secure: false,
        auth: {
          user: MAILING_ADDRESS,
          pass: process.env.MAILING_ADDRESS_PASSWORD
        }
      });

      let info = await transporter.sendMail({
        from: `"${APP_NAME}" <${MAILING_ADDRESS}>`,
        to: email,
        subject: `Your new ${APP_NAME} password`,
        text: `Your new password for ${email} is ${newPassword}`
      });

      // set password to user
      user.password = newPassword;

      // clear the user tokens
      user.tokens = null;
      await user.save();

      res.json({ msg: `Password sent successfully to ${email}` });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
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
      user.image_uploaded = true;

      await user.save();

      res.json({ user });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

module.exports = router;
