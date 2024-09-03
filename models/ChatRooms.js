const mongoose = require('mongoose');

const ChatRoomSchema = new mongoose.Schema({
  senderUid: String,
  receiverUid: String,
  chatRoomId: String,
  lastMessage: String,
  lastMessageTime: Date,
  lastMessageSenderUid: String,
  lastMessageRead: Boolean,
});

const ChatRoomModal = mongoose.model('chatrooms', ChatRoomSchema);

module.exports = ChatRoomModal;
