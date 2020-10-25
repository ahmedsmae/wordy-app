const User = require('../models/user');
const { Expo } = require('expo-server-sdk');
let expo = new Expo();

module.exports = async function() {
  const users = await User.find({
    'tokens.notification_token': { $exists: true }
  });

  let messages = [];
  for (let user of users) {
    if (Expo.isExpoPushToken(user.tokens.notification_token)) {
      messages.push({
        to: user.tokens.notification_token,
        sound: 'default',
        title: `Hello ${user.name}`,
        body: 'How are you ?',
        data: {
          text: Date.now(),
          option1: 'OK',
          option2: 'CANCEL'
        }
      });
    }
  }

  const response = await expo.sendPushNotificationsAsync(messages);

  console.log(response);
};
