module.exports = function(app) {
  app.use('/api/users', require('./users/create'));
  app.use('/api/users', require('./users/read'));
  app.use('/api/users', require('./users/update'));
  app.use('/api/users', require('./users/delete'));

  app.use('/api/chats', require('./chats/read'));
  app.use('/api/chats', require('./chats/create'));
};
