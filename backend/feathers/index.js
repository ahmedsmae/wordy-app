const MessageService = require('./message-service');

module.exports = function(app) {
  app.use('/messages', new MessageService());

  // New connections connect to stream channel
  app.on('connection', conn => app.channel('stream').join(conn));
  // Publish events to stream
  app.publish(data => app.channel('stream', data));

  app.service('messages').on('created', message => {
    console.log('A new message has been created', message);
  });
};
