const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');
const { check, validationResult } = require('express-validator');
const { Expo } = require('expo-server-sdk');
let expo = new Expo();

const User = require('../../models/user');

/**
 * @method - POST
 * @url - '/api/notifications/send'
 * @data - { title, body, data }
 * @action - send notification to all users
 * @access - publis
 */
router.post(
  '/send',
  [
    check('title', 'Title is required')
      .not()
      .isEmpty(),
    check('body', 'Body is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, body, data } = req.body;

    try {
      const users = await User.find({
        'tokens.notification_token': { $exists: true }
      });

      // https://docs.expo.io/versions/latest/guides/push-notifications/
      // https://github.com/expo/expo-server-sdk-node
      // "to": [
      //   "ExponentPushToken[zzzzzzzzzzzzzzzzzzzzzz]",
      //   "ExponentPushToken[aaaaaaaaaaaaaaaaaaaaaa]"
      // ],

      // ? CUSTOM MESSAGE FOR EACH USER
      let messages = [];
      for (let user of users) {
        if (Expo.isExpoPushToken(user.tokens.notification_token)) {
          messages.push({
            to: user.tokens.notification_token,
            sound: 'default',
            title: `${title} ${user.name}`,
            body,
            data
          });
        }
      }

      // ? IF SAME MESSAGE FOR ALL
      // const usersTokens = users.map(
      //   ({ tokens: { notification_token } }) =>
      //     Expo.isExpoPushToken(notification_token) && notification_token
      // );

      // const message = {
      //   to: usersTokens,
      //   sound: 'default',
      //   title,
      //   body,
      //   data
      // };

      const response = await expo.sendPushNotificationsAsync(messages);

      console.log(response);

      res.json({ msg: 'Notifications sent!' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: [{ msg: err.message }] });
    }
  }
);

module.exports = router;
