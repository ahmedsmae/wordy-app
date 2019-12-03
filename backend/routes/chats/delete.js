const express = require('express');
var aws = require('aws-sdk');
const router = express.Router();
var s3 = new aws.S3();
const auth = require('../utils/auth');

const User = require('../../models/user');
const Chat = require('../../models/chat');

/**
 * @method - DELETE
 * @url - '/api/chats/:chatid'
 * @data - token
 * @action - delete chat
 * @access - private
 */
router.delete('/:chatid', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User does not exists' }] });
    }

    const chat = await Chat.findById(req.params.chatid);

    if (!chat) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Chat does not exists' }] });
    }

    if (String(chat.admin) !== String(user._id)) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User is not admin for this chat' }] });
    }

    const deleteArray = [];
    for (msg of chat.messages) {
      if (msg.type === 'IMAGE') {
        deleteArray.push({
          Key: `shared-images/${msg.attachment.file_name}.jpg`
        });
      }
    }

    s3.deleteObjects(
      { Bucket: process.env.S3_BUCKET_NAME, Delete: { Objects: deleteArray } },
      function(err, data) {
        if (err) {
          console.log(err, err.stack);
          throw new Error(err);
        } else {
          console.log(data);
        }
      }
    );

    await chat.remove();

    const userChats = await Chat.find(
      { opponents: user._id },
      { opponents: 1, createdAt: 1, lastUpdated: 1, messages: { $slice: -1 } }
    )
      .populate('opponents', '-tokens -avatar')
      .populate('admin', '-tokens -avatar');

    res.json({ userChats });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - PATCH
 * @url - '/api/chats/removeuserfromchat/:chatid'
 * @data - token
 * @action - remove user from chat
 * @access - private
 */
router.patch('/removeuserfromchat/:chatid', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User does not exists' }] });
    }

    const chat = await Chat.findById(req.params.chatid);

    if (!chat) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Chat does not exists' }] });
    }

    chat.opponents = chat.opponents.filter(
      opp => String(opp) !== String(user._id)
    );

    await chat.save();

    const userChats = await Chat.find(
      { opponents: user._id },
      { opponents: 1, createdAt: 1, lastUpdated: 1, messages: { $slice: -1 } }
    )
      .populate('opponents', '-tokens -avatar')
      .populate('admin', '-tokens -avatar');

    res.json({ userChats });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
