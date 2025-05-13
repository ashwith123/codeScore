const express = require("express");
const router = express.Router();
let { login, profile, signin } = require("../controllers/authControllers.js");
let authenticateToken = require("../middleware/authMiddleware.js");

router.post("/signup", signin);
router.post("/login", login);

router.get("/profile", authenticateToken, profile);

module.exports = router;
