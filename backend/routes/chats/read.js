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
      { opponents: 1, createdAt: 1, lastUpdated: 1, messages: { $slice: -1 } }
    ).populate('opponents');

    console.log('server userChats', userChats);

    res.json({ userChats });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - '/api/chats/getchatbyid/:chatid'
 * @data - token header
 * @action - get chat by its id
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

    const chat = await Chat.findById(req.params.chatid).populate('opponents');

    console.log('server chat by id', chat);

    res.json({ chat });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - '/api/chats/getchatbyopponentid/:opponentid'
 * @data - token header
 * @action - get chat by its id
 * @access - private
 */
router.get('/getchatbyopponentid/:opponentid', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User does not exists' }] });
    }

    let chat = await Chat.findOne({
      opponents: { $all: [user._id, req.params.opponentid] }
    }).populate('opponents');

    if (!chat) {
      console.log('creating new chat');

      chat = new Chat({ opponents: [user._id, req.params.opponentid] });
      await chat.save();
    }

    console.log('server chat by id', chat);

    res.json({ chat });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
