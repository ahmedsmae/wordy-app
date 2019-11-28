const Chat = require('../models/chat');
const Message = require('../models/message');

module.exports = class MessageService {
  constructor() {
    this.messages = [];
    this.chat = null;
  }

  async find({
    query: {
      $feathers: { userId, opponentId }
    }
  }) {
    let chat = await Chat.findOne({
      opponents: { $all: [userId, opponentId] }
    });

    if (chat) {
      console.log('chat found');
    } else {
      console.log('create new chat');
      chat = new Chat({ opponents: [userId, opponentId] });
      await chat.save();
    }

    this.chat = chat;
    this.messages = chat.messages;
    return this.messages;
  }

  async create({ owner, text }) {
    const message = new Message({ owner, text });

    const chat = this.chat;
    chat.messages.push(message);
    await chat.save();
    this.messages = chat.messages;
    return message;
  }
};
