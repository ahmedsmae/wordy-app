const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');
const {
  MAILING_ADDRESS,
  MAILING_HOST,
  MAILING_SERVICE,
  APP_NAME,
  ADMIN_EMAIL,
  ADMIN_NAME
} = require('../../constants/constants');

/**
 * @method - POST
 * @url - '/api/users/contactus'
 * @data - {email, subject, message}
 * @action - send a contact email
 * @access - public
 */
router.post(
  '/contactus',
  [
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('subject', 'Subject is required')
      .not()
      .isEmpty(),
    check('message', 'Message is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, subject, message } = req.body;

    try {
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
        from: `"${email}" <${MAILING_ADDRESS}>`,
        to: `"${ADMIN_NAME}" <${ADMIN_EMAIL}>`,
        subject: `${APP_NAME} contact mail - ${subject}`,
        text: message
      });

      res.json({ msg: `Mail successfully sent. Thank You...` });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

module.exports = router;
