const express = require("express");
let authenticateToken = require("../middleware/authMiddleware.js");
let {
  getUserSidebar,
  getChat,
  sendMessage,
} = require("../controllers/msgControllers.js");
const router = express.Router();

router.get("/users", authenticateToken, getUserSidebar);
router.get("/:id", authenticateToken, getChat);

router.post("/send/:id", authenticateToken, sendMessage);

module.exports = router;
