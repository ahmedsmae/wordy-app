const sio = require('socket.io');
const Chat = require('../models/chat');
const Message = require('../models/message');

module.exports = function(expressServer) {
  const io = sio(expressServer);

  io.on('connection', async socket => {
    console.log(socket.handshake.query);

    const { userId, opponentId } = socket.handshake.query;

    const chat = await Chat.findOne({
      opponents: { $all: [userId, opponentId] }
    });

    socket.emit('send_chat_from_server', chat);

    socket.on('update_messages_to_seen', unseenMessages => {
      chat.messages = chat
        .toObject()
        .messages.map(sms =>
          unseenMessages.includes(sms._id.toString())
            ? { ...sms, seen: true, recieved: true }
            : sms
        );

      chat.save();

      io.emit('all_messages', chat.messages);
    });

    socket.on('create_new_message', ({ owner, text }, callback) => {
      try {
        const message = new Message({ owner, text }).toObject();
        chat.messages.push(message);
        chat.save();

        io.emit('all_messages', chat.messages);

        callback();
      } catch (err) {
        callback(err);
      }
    });

    socket.on('update_message_to_recieved', userId => {
      console.log('server, update message to recieved');
      chat.messages = chat
        .toObject()
        .messages.map(sms =>
          userId !== sms.owner.toString()
            ? { ...sms, recieved: true, seen: true }
            : sms
        );

      chat.save();
    });
  });
};
