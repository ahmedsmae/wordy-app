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
          const message = new Message({
            owner,
            type: 'TEXT',
            text,
            has_attachment: false,
            attachment: null
          }).toObject();
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

    socket
      .in(chatId)
      .on(
        'new_location_message_from_client',
        async ({ location, owner }, callback) => {
          try {
            const message = new Message({
              owner,
              type: 'LOCATION',
              text: '',
              has_attachment: true,
              attachment: { location }
            }).toObject();

            await Chat.updateOne(
              { _id: chatId },
              { $push: { messages: message } }
            );

            // Send to all users in chatId room only
            io.to(chatId).emit('new_message_from_server', message);

            callback();
          } catch (err) {
            console.log(err);
            callback(err);
          }
        }
      );

    socket
      .in(chatId)
      .on('new_image_message_from_client', async ({ owner, file_name }) => {
        const message = new Message({
          owner,
          type: 'IMAGE',
          text: '',
          has_attachment: true,
          attachment: { file_name }
        }).toObject();
        // console.log(message);

        try {
          await Chat.updateOne(
            { _id: chatId },
            { $push: { messages: message } }
          );

          io.to(chatId).emit('new_message_from_server', message);
        } catch (err) {
          console.log(null, err);
        }
      });
  });
};
