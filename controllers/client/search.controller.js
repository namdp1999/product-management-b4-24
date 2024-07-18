const Product = require("../../models/product.model");

// [GET] /search
module.exports.index = async (req, res) => {
  const keyword = req.query.keyword;

  let products = [];

  if(keyword) {
    const regex = new RegExp(keyword, "i");

    products = await Product.find({
      title: regex,
      status: "active",
      deleted: false
    });

    for (const item of products) {
      item.priceNew = ((1 - item.discountPercentage/100) * item.price).toFixed(0);
    }
  }

  res.render("client/pages/search/index", {
    pageTitle: "Tìm kiếm",
    keyword: keyword,
    products: products
  });
}