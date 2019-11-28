const sio = require('socket.io');
const Chat = require('../models/chat');
const Message = require('../models/message');

module.exports = function(expressServer) {
  const io = sio(expressServer);

  io.on('connection', async socket => {
    console.log(socket.handshake.query);
    const { chatId } = socket.handshake.query;

    socket.leaveAll();
    socket.join(chatId);

    const chat = await Chat.findById(chatId).populate('opponents');

    // Send back the message to this specific user only
    socket.emit('init_chat_from_server', chat);

    socket
      .in(chatId)
      .on('new_message_from_client', async ({ owner, text }, callback) => {
        try {
          const message = new Message({ owner, text }).toObject();
          await Chat.updateOne(
            { _id: chatId },
            { $push: { messages: message } }
          );

          // Send to all users in chatId room only
          io.to(chatId).emit('new_message_from_server', message);

          callback();
        } catch (err) {
          callback(err);
        }
      });
  });
};
