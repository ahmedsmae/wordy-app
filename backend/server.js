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

app.use(express.static('frontend'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'index.html'));
});

// set intervals
// setInterval(() => {
//   // require('./intervals/send-notifications')();
// }, 10000);
// require('./intervals/message-every-minute')();
// require('./intervals/specific-date')();

const expressServer = app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

// Init Socketio
socketio(expressServer);
