const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const auth = require('../utils/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/user');
const {
  MAILING_ADDRESS,
  MAILING_HOST,
  MAILING_SERVICE,
  APP_NAME,
  ADMIN_EMAIL
} = require('../../constants/constants');

/**
 * @method - POST
 * @url - '/api/users/signout'
 * @data - token header
 * @action - signout a user
 * @access - private
 */
router.post('/signout', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User does not exists' }] });
    }

    user.tokens.basic_token = null;
    user.tokens.facebook_token = null;
    user.tokens.google_token = null;
    await user.save();

    res.json({ msg: 'User logged out successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - DELETE
 * @url - '/api/users/deleteuser'
 * @data - { reason, details, email, password }
 * @action - delete a user
 * @access - private
 */
router.delete(
  '/deleteuser',
  [
    auth,
    [
      check('reason', 'Reason is required')
        .not()
        .isEmpty(),
      check('email', 'Email is required')
        .not()
        .isEmpty(),
      check('password', 'Password is requires')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { reason, details, email, password } = req.body;

    try {
      const user = await User.findByCredentials(email, password);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      if (user._id.toString() !== req.user._id.toString()) {
        return res.status(400).json({
          errors: [{ msg: 'You can not delete someone else account' }]
        });
      }

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
        to: ADMIN_EMAIL,
        subject: `${APP_NAME} User has been removed :(`,
        text: `User: ${email}\nReason: ${reason}\nDetails: ${details}`
      });

      // delete all user info except user.name
      delete user.email;
      delete user.password;
      delete user.status;
      delete user.image_uploaded;
      delete user.avatar;
      delete user.sign_in_method;
      delete user.photo_url;
      delete user.tokens;

      // add prop deleted:true
      user.deleted = true;

      await user.save();

      res.json({ msg: 'User deleted :(' });
    } catch (err) {
      res.status(500).send({ msg: err.message });
    }
  }
);

module.exports = router;
