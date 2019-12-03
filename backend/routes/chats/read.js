const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');

const User = require('../../models/user');
const Chat = require('../../models/chat');

/**
 * @method - GET
 * @url - '/api/chats/alluserchats'
 * @data - token header
 * @action - get current user chats
 * @access - private
 */
router.get('/alluserchats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User does not exists' }] });
    }

    const userChats = await Chat.find(
      { opponents: user._id },
      {
        opponents: 1,
        createdAt: 1,
        lastUpdated: 1,
        group: 1,
        name: 1,
        image_url: 1,
        status: 1,
        image_uploaded: 1,
        messages: { $slice: -1 }
      }
    )
      // exclude tokens when u populate opponents or admin
      .populate('opponents', '-tokens -avatar')
      .populate('admin', '-tokens -avatar')
      // ! sort the chats by the last message date
      .sort({ 'messages[0].createdAt': -1 });

    res.json({ userChats });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - '/api/chats/getchatid/:opponentid'
 * @data - token header
 * @action - get chat by user and opponent ids
 * @access - private
 */
router.get('/getchatid/:opponentid', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User does not exists' }] });
    }

    let chat = await Chat.findOne({
      // should contain only these 2 users ( Not more than this ) order doesn't matter
      opponents: { $size: 2, $all: [user._id, req.params.opponentid] }
    });

    if (!chat) {
      console.log('creating new chat');

      chat = new Chat({ opponents: [user._id, req.params.opponentid] });
      await chat.save();
    }

    res.json({ chatId: chat._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - '/api/chats/getchatbyid/:chatid'
 * @data - token header
 * @action - get chat by it's
 * @access - private
 */
router.get('/getchatbyid/:chatid', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User does not exists' }] });
    }

    let chat = await Chat.findById(req.params.chatid)
      .populate('opponents', '-tokens -avatar')
      .populate('admin', '-tokens -avatar');

    if (!chat) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Chat does not exists' }] });
    }

    res.json({ chat });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - '/api/chats/avatar/:chatid'
 * @data - No data
 * @action - serving chat avatar
 * @access - public
 */
router.get('/avatar/:chatid', async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatid);

    if (!chat) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Chat does not exists' }] });
    }

    res.set('Content-Type', 'image/jpg');
    res.send(chat.avatar);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
