const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const authRoute = require("../backend/routes/authRoute");
const authMessage = require("../backend/routes/authMessage");
const dotenv = require("dotenv");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api", authRoute);
app.use("/api/msg", authMessage);

mongoose
  .connect("mongodb://localhost:27017/vchat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.listen(8080, (req, res) => {
  console.log("listening at port 8080");
});
