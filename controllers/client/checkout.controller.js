const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");

// [GET] /checkout/
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;

  const cart = await Cart.findOne({
    _id: cartId
  });

  cart.totalPrice = 0;

  if(cart.products.length > 0) {
    for (const product of cart.products) {
      const productInfo = await Product.findOne({
        _id: product.productId
      }).select("title thumbnail slug price discountPercentage");
      productInfo.priceNew = (1 - productInfo.discountPercentage/100) * productInfo.price;
      product.productInfo = productInfo;
      product.totalPrice = productInfo.priceNew * product.quantity;
      cart.totalPrice += product.totalPrice;
    }
  }

  res.render("client/pages/checkout/index", {
    pageTitle: "Đặt hàng",
    cartDetail: cart
  });
};