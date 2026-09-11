const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },

  items: [
    {
      itemId: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],

  subtotal: {
    type: Number,
    required: true,
  },

  tax: {
    type: Number,
    required: true,
  },

  total: {
    type: Number,
    required: true,
  },

  paymentStatus: {
    type: String,
    default: "paid",
  },

  stripePaymentIntentId: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);