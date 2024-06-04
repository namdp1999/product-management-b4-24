// [GET] /products/
module.exports.index = (req, res) => {
  res.render("client/pages/products/index", {
    pageTitle: "Danh sách sản phẩm"
  });
}

// [POST] /products/create
// module.exports.create = (req, res) => {
//   res.render("client/pages/products/create");
// }

// [PATCH] /products/edit
// module.exports.edit = (req, res) => {
//   res.render("client/pages/products/edit");
// }

// [GET] /products/detail
// module.exports.detail = (req, res) => {
//   res.render("client/pages/products/detail");
// }