const express = require("express");
const cors = require("cors");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Intelligent Bistro API is running");
});

app.use("/api/ai", aiRoutes);

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});