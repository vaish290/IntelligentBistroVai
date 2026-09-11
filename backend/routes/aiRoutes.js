const express = require("express");
const parseOrderMessage = require("../services/aiParser");

const router = express.Router();

router.post("/order", async (req, res) => {
  try {
    const { message, cart } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const result = await parseOrderMessage(
      message,
      cart || []
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error("AI ERROR:", error);

    return res.status(500).json({
      error: "Unable to process your request",
    });
  }
});

module.exports = router;