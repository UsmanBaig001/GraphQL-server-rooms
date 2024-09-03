const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({
  message: {type: String},
  sendBy: {type: String},
  receiveBy: {type: String},
  createdAt: {type: Date, default: Date.now},
  dateStamp: {type: Date, default: Date.now},
  chatRoomId: {type: String},
});

const ChatRoomSchema = new mongoose.Schema({
  chatRoomId: {type: String, unique: true},
  messages: [MessageSchema],
});

const MessagesModal = mongoose.model('chats', ChatRoomSchema);

module.exports = MessagesModal;
