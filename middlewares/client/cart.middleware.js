const Cart = require("../../models/cart.model");

module.exports.cartId = async (req, res, next) => {
  console.log("Chạy vào đây1");

  if(!req.cookies.cartId) {
    const cart = new Cart();
    await cart.save();

    const expires = 365 * 24 * 60 * 60 * 1000;

    res.cookie(
      "cartId", 
      cart._id.toString(), // Đảm bảo sử dụng cart._id.toString()
      { 
        expires: new Date(Date.now() + expires),
        httpOnly: true, // Bảo mật cookie
      });
  } else {
    const cart = await Cart.findOne({
      _id: req.cookies.cartId
    });
    res.locals.cartTotal = cart.products.length || 0;
  }
  
  next();
}