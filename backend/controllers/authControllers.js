let user = require("../models/user");
let jwt = require("jsonwebtoken");
const secret = "process.env.SECRET";

if (!secret) {
  throw new Error("JWT Secret not set in environment variables");
}

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
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "Strict",
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(201).json({
          _id: currUser._id,
          username: currUser.username,
          email: currUser.email,
          profilePic: currUser.profilePic,
          createdAt: currUser.createdAt,
        });
      } else {
        res.send({ message: "password is incorrect" });
      }
      res.status(200).send({ message: "Login successful" });
    }
  } catch (e) {
    console.log(e);
  }
};

const signin = async (req, res) => {
  try {
    console.log("this is request body", req.body);
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
      console.log("User already exists with email:", existingUser.email);
      return res.status(400).send({ message: "User already exists" });
    }

    const newUser = new user({
      username,
      email,
      password,
    });

    await newUser.save();

    let payload = {
      username: newUser.username,
      email: newUser.email,
    };

    let token = jwt.sign(payload, secret, { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      profilePic: newUser.profilePic,
      createdAt: newUser.createdAt,
    });
  } catch (e) {
    console.error("Error in login controller:", e);
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

const profileUpdate = async (req, res) => {
  try {
    let newimage = req.body.profilePic;
    let currUser = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(newimage);
    const finalimage = await user
      .findByIdAndUpdate(
        currUser,
        {
          profilePic: uploadResponse,
        },
        { new: true }
      )
      .select("-password");
    res
      .status(200)
      .json({ message: "Profile updated successfully", finalimage });
  } catch (e) {
    res.send("error while uploading image error:" + e);
  }
};

const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "Strict",
    });
    res.status(200).send({ message: "Logout successful" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  login,
  signin,
  profile,
  profileUpdate,
  checkAuth,
  logout,
};
