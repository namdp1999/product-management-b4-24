const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");

const chatSocket = require("../../sockets/client/chat.socket");

// [GET] /chat/:roomChatId
module.exports.index = async (req, res) => {
  const roomChatId = req.params.roomChatId;
  
  // SocketIO
  chatSocket(req, res);
  // End SocketIO

  const chats = await Chat.find({
    roomChatId: roomChatId
  });

  for (const chat of chats) {
    const infoUser = await User.findOne({
      _id: chat.userId
    });

    chat.fullName = infoUser.fullName;
  }

  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
    chats: chats
  });
};