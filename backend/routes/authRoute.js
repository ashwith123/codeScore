const express = require("express");
const router = express.Router();
let {
  login,
  profileUpdate,
  profile,
  signin,
  checkAuth,
  logout,
} = require("../controllers/authControllers.js");
let authenticateToken = require("../middleware/authMiddleware.js");

router.post("/signup", signin);
router.post("/login", login);

router.get("/profile", authenticateToken, profile);

router.put("/update-profile", authenticateToken, profileUpdate);

router.get("/check", authenticateToken, checkAuth);

router.post("/logout", logout);

module.exports = router;
