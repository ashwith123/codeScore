let user = require("../models/user");
let jwt = require("jsonwebtoken");
const secret = "mysecret";

const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let currUser = await user.findOne({ email });
    if (!currUser) {
      res.send({ message: "user doesnt exist" });
    } else {
      let isCorrectPass = await currUser.matchPassword(password);
      if (isCorrectPass) {
        let payload = {
          id: currUser._id,
          email: currUser.email,
        };

        let token = jwt.sign(payload, secret, { expiresIn: "1h" });
        res.send({ token });
      } else {
        res.send({ message: "password is incorrect" });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const signin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
      return res.status(400).send({ message: "all feilds required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .send({ message: "password must be greater than 6 letter" });
    }

    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    const newUser = new user({
      username,
      email,
      password,
    });

    await newUser.save();

    res.status(201).send({ message: "User created successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Server error" });
  }
};

const profile = async (req, res) => {
  try {
    const currUser = await user.findById(req.user.id);
    if (!currUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Profile found", user: currUser });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  login,
  signin,
  profile,
};
