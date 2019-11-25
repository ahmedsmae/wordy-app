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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const chatSchema = new mongoose.Schema(
  {
    opponents: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      ],
      required: true
    },
    messages: {
      type: [messageSchema],
      required: true
    }
  },
  { timestamps: true }
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
