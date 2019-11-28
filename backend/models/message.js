const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true
  },
  text: {
    type: String
  },
  seen: {
    type: Boolean,
    default: false
  },
  recieved: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
