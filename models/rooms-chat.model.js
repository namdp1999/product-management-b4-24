const mongoose = require("mongoose");

const roomChatSchema = new mongoose.Schema({
  title: String,
  // avatar: String,
  typeRoom: String,
  users: [
    {
      userId: String,
      role: String
    }
  ],
  deleted: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});

const RoomChat = mongoose.model("RoomChat", roomChatSchema, "rooms-chat");

module.exports = RoomChat;