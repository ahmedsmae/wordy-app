const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'TEXT'
  },
  text: {
    type: String
  },
  has_attachment: {
    type: Boolean,
    default: false
  },
  attachment: {
    type: Object
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
