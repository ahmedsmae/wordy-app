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
app.use('/uploads', express.static('uploads'));
middleware(app);
routes(app);

app.use(express.static('frontend'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'index.html'));
});

const expressServer = app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

// Init Socketio
socketio(expressServer);
