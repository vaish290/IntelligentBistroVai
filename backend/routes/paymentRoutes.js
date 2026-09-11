const express = require("express");
const Stripe = require("stripe");
const { getMenu } = require("../services/menuServices");

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({
        error: "Cart is required",
      });
    }

    const menu = await getMenu();

    let subtotal = 0;

    for (const cartItem of cart) {
      const menuItem = menu.find(
        (item) => item.id === cartItem.id
      );

      if (!menuItem) {
        return res.status(400).json({
          error: `Invalid menu item: ${cartItem.id}`,
        });
      }

      const quantity = Number(cartItem.quantity);

      if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({
          error: `Invalid quantity for ${menuItem.name}`,
        });
      }

      subtotal += menuItem.price * quantity;
    }

    const tax = subtotal * 0.08;

    const total = subtotal + tax;

    const amountInCents = Math.round(total * 100);

    const paymentIntent =
      await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      subtotal: Number(subtotal.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      total: Number(total.toFixed(2)),
    });
  } catch (error) {
    console.error("STRIPE ERROR:", error);

    return res.status(500).json({
      error: "Unable to create payment",
    });
  }
});

module.exports = router;