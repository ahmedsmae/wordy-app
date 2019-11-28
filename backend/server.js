const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const db = require('./database');
const middleware = require('./middleware');
const routes = require('./routes');
const socketio = require('./socketio');

// Init MongoDB connection
db();

// Init Express server
const app = express();

// Init Middleware / Feathers Routes / Express Routes
app.use(express.json({ extended: false }));
middleware(app);
routes(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

  app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
  });
}

const expressServer = app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

// Init Socketio
socketio(expressServer);
