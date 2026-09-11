require("dotenv").config();
const express = require("express");
const cors = require("cors");
const aiRoutes = require("./routes/aiRoutes");
const menuRoutes = require("./routes/menuRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const mongoose = require("mongoose");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/menu", menuRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });


app.get("/", (req, res) => {
  res.send("Intelligent Bistro API is running");
});

app.use("/api/ai", aiRoutes);

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});