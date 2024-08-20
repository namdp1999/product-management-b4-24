// [GET] /rooms-chat/
module.exports.index = async (req, res) => {
  res.render("client/pages/rooms-chat/index", {
    pageTitle: "Danh sách phòng",
  });
};