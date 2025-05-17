const express = require("express");
const router = express.Router();
let {
  login,
  profileUpdate,
  profile,
  signin,
  checkAuth,
} = require("../controllers/authControllers.js");
let authenticateToken = require("../middleware/authMiddleware.js");

router.post("/signup", signin);
router.post("/login", login);

router.get("/profile", authenticateToken, profile);

router.put("/profile-update", authenticateToken, profileUpdate);

router.get("/check", authenticateToken, checkAuth);

module.exports = router;
