const message = require("../models/message");
const user = require("../models/user");

const getUserSidebar = (req, res) => {
  try {
    let loggedInUserId = req.user._id;
    let filteredUsers = new user.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    res.send(filteredUsers);
  } catch (e) {
    res.status(400).send({ message: "unable to filter user for sidebar" });
  }
};

const getChat = (req, res) => {
  try {
    let currUser = req.user._id;
    let SendToUserId = req.params;

    let chat = new user.find({
      $or: [
        { senderId: currUser, receiverId: SendToUserId },
        { senderId: SendToUserId, receiverId: currUser },
      ],
    });

    response.send(chat);
  } catch (e) {
    response.status(400).send({ message: "unable to retrive chat" });
  }
};

const sendMessage = (req, res) => {
  try {
    let receiverId = req.params;
    let senderId = req.user._id;
    let text = req.body;
    let newmessage = new message({
      senderId,
      receiverId,
      text,
    });

    newmessage.save();
  } catch (e) {
    console.log("error while sending message" + e);
  }
};

module.exports = { getUserSidebar, getChat, sendMessage };
