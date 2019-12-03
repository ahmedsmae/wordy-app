const express = require('express');
const router = express.Router();
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
  console.log('server delete chat');

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

module.exports = router;
