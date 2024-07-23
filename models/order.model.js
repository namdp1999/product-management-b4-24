const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userInfo: {
    fullName: String,
    phone: String,
    address: String,
  },
  products: [
    {
      productId: String,
      price: Number,
      discountPercentage: Number,
      quantity: Number
    }
  ]
}, {
  timestamps: true
});

const Order = mongoose.model("Order", orderSchema, "orders");

module.exports = Order;