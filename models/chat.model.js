const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userId: String,
  // roomChatId: String,
  content: String,
  images: Array,
  roomChatId: String
}, {
  timestamps: true
});

const Chat = mongoose.model("Chat", chatSchema, "chats");

module.exports = Chat;