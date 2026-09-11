const express = require("express");
const Order = require("./models/Order");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      orderId,
      items,
      subtotal,
      tax,
      total,
      paymentStatus,
      stripePaymentIntentId,
    } = req.body;

    const order = await Order.create({
      orderId,
      items,
      subtotal,
      tax,
      total,
      paymentStatus,
      stripePaymentIntentId,
    });

    return res.status(201).json(order);
  } catch (error) {
    console.error("ORDER SAVE ERROR:", error);

    return res.status(500).json({
      error: "Unable to save order",
    });
  }
});

module.exports = router;