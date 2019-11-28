const express = require('express');
const sharp = require('sharp');
const router = express.Router();
const auth = require('../utils/auth');
const upload = require('../utils/upload');

const User = require('../../models/user');
const Chat = require('../../models/chat');

/**
 * @method - POST
 * @url - '/api/chats/creategroup'
 * @data - { opponents, name, status, image_uploaded } + image file
 * @action - get chat by user and opponent ids
 * @access - private
 */
router.post('/creategroup', auth, upload.single('avatar'), async (req, res) => {
  const { opponents, name, status, image_uploaded } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User does not exists' }] });
    }

    const buffer = await sharp(req.file.buffer)
      .resize({ width: 200, height: 200 })
      .png()
      .toBuffer();

    const chat = new Chat({
      opponents: [user._id, ...JSON.parse(opponents)],
      name,
      status,
      image_uploaded,
      avatar: buffer,
      admin: user._id,
      group: true
    });
    await chat.save();

    const userChats = await Chat.find(
      { opponents: user._id },
      { opponents: 1, createdAt: 1, lastUpdated: 1, messages: { $slice: -1 } }
    ).populate('opponents');

    res.json({ userChats });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
