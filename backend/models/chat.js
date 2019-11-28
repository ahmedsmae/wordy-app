const mongoose = require('mongoose');

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
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      trim: true
    },
    group: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: Buffer
    },
    image_uploaded: {
      type: Boolean,
      default: false
    },
    messages: {
      type: [Object],
      required: true
    }
  },
  { timestamps: true }
);

chatSchema.methods.toJSON = function() {
  const chat = this;
  const chatObject = chat.toObject();

  delete chatObject.avatar;

  return chatObject;
};

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
