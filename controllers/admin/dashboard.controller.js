// [GET] /admin/dashboard
module.exports.index = (req, res) => {
  res.render("admin/pages/dashboard/index", {
    pageTitle: "Trang tổng quan"
  });
}