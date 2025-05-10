const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const user = require("./models/user");
const { compare } = require("bcrypt");

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/codescore", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    let currUser = await user.findOne({ email });

    if (!currUser) {
      res.send({ message: "user doesnt exist" });
    } else {
      let isCorrectPass = await currUser.matchPassword(password);
      if (isCorrectPass) {
        res.send({ message: "password is correct" });
      } else {
        res.status(404).send({ message: "password is incorrect" });
      }
    }
  } catch (e) {
    console.log(e);
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    const newUser = new user({
      email,
      password,
    });

    await newUser.save();

    res.status(201).send({ message: "User created successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Server error" });
  }
});

app.listen(8080, (req, res) => {
  console.log("listening at port 8080");
});
