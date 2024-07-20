const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: [
    {
      productId: String,
      quantity: Number
    }
  ]
}, {
  timestamps: true
});

const Cart = mongoose.model("Cart", cartSchema, "carts");

module.exports = Cart;