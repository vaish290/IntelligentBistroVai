const express = require("express");
const { getMenu } = require("../services/menuServices");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const menu = await getMenu();

    return res.status(200).json(menu);
  } catch (error) {
    console.error("MENU ERROR:", error);

    return res.status(500).json({
      error: "Unable to load menu",
    });
  }
});

module.exports = router;