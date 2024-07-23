const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const Order = require("../../models/order.model");

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

// [POST] /checkout/order
module.exports.orderPost = async (req, res) => {
  const cartId = req.cookies.cartId;
  const userInfo = req.body;

  const orderData = {
    userInfo: userInfo,
    products: []
  };

  const cart = await Cart.findOne({
    _id: cartId
  });

  for (const item of cart.products) {
    const productInfo = await Product.findOne({
      _id: item.productId
    });

    orderData.products.push({
      productId: item.productId,
      price: productInfo.price,
      discountPercentage: productInfo.discountPercentage,
      quantity: item.quantity
    });
  }

  const order = new Order(orderData);
  await order.save();

  await Cart.updateOne({
    _id: cartId
  }, {
    products: []
  });
  
  res.redirect(`/checkout/success/${order.id}`);
};

// [GET] /checkout/success/:orderId
module.exports.success = async (req, res) => {
  const orderId = req.params.orderId;
  
  const order = await Order.findOne({
    _id: orderId
  });

  let totalPrice = 0;

  for (const item of order.products) {
    const productInfo = await Product.findOne({
      _id: item.productId
    });

    item.thumbnail = productInfo.thumbnail;
    item.title = productInfo.title;
    item.priceNew = (1 - item.discountPercentage/100) * item.price;
    item.totalPrice = item.priceNew * item.quantity;
    totalPrice += item.totalPrice;
  }

  res.render("client/pages/checkout/success", {
    pageTitle: "Đặt hàng thành công",
    order: order,
    totalPrice: totalPrice
  });
};