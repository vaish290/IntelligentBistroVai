const express = require("express");
const parseOrderMessage = require("../services/aiParser");

const router = express.Router();

router.post("/order", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      error: "Message is required",
    });
  }

  const result = parseOrderMessage(message);
  res.json(result);
});

module.exports = router;