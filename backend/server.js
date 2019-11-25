const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();

const connectMongoDB = require('./database/mongo-db');
connectMongoDB();

// Init Middleware
app.use(compression());
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routers
app.use('/api/users', require('./routes/users/create'));
app.use('/api/users', require('./routes/users/read'));
app.use('/api/users', require('./routes/users/update'));
app.use('/api/users', require('./routes/users/delete'));

app.use('/api/chats', require('./routes/chats/read'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.use(enforce.HTTPS({ trustProtoHeader: true }));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
