// [GET] /chat/
module.exports.index = async (req, res) => {
  // SocketIO
  _io.on("connection", (socket) => {
    console.log("Có 1 người dùng kết nối", socket.id);
  });
  // End SocketIO

  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
  });
};