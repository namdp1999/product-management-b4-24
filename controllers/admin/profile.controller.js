// [GET] /admin/profile
module.exports.index = (req, res) => {
  res.render("admin/pages/profile/index", {
    pageTitle: "Thông tin cá nhân"
  });
}