const express = require('express');
const sharp = require('sharp');
const router = express.Router();
const auth = require('../utils/auth');
const upload = require('../utils/upload');
const uploadFiles = require('../utils/upload-files');

const User = require('../../models/user');
const Chat = require('../../models/chat');

/**
 * @method - PATCH
 * @url - '/api/chats/updategroupinfo'
 * @data - { _id, opponents, name, status, image_uploaded } + image file
 * @action - update group info
 * @access - private
 */
router.patch(
  '/updategroupinfo',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const { _id, opponents, name, status, image_uploaded } = req.body;

    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User does not exists' }] });
      }

      const chat = await Chat.findById(_id);

      if (!chat) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Chat does not exists' }] });
      }

      let buffer;
      if (req.file) {
        buffer = await sharp(req.file.buffer)
          .resize({ width: 200, height: 200 })
          .png()
          .toBuffer();
      }

      if (name) chat.name = name;
      if (status) chat.status = status;
      if (opponents) chat.opponents = [user._id, ...JSON.parse(opponents)]; // current user removed in the frontend
      if (image_uploaded) chat.image_uploaded = image_uploaded;
      if (buffer) chat.avatar = buffer;

      await chat.save();

      const userChats = await Chat.find(
        { opponents: user._id },
        { opponents: 1, createdAt: 1, lastUpdated: 1, messages: { $slice: -1 } }
      )
        .populate('opponents', '-tokens -avatar')
        .populate('admin', '-tokens -avatar');

      res.json({ userChats });
    } catch (err) {
      console.log(err);

      console.error(err.message);
      res.status(500).json({ errors: [{ msg: err.message }] });
    }
  }
);

/**
 * @method - POST
 * @url - '/api/chats/messages/:filename'
 * @data - image file
 * @action - upload image to the server (as a file)
 * @access - private
 */
router.post(
  '/messages/:filename',
  auth,
  uploadFiles.single('image'),
  async (req, res) => {
    try {
      res.json({ msg: 'Image uploaded seccessfully' });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

module.exports = router;
