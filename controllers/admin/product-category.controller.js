// [GET] /admin/products-category
module.exports.index = (req, res) => {
  res.render("admin/pages/products-category/index", {
    pageTitle: "Danh mục sản phẩm"
  });
}