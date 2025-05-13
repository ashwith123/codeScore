const jwt = require("jsonwebtoken");
const secret = "mysecret";

const authenticateToken = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = user;
      next();
    });
  } catch (e) {
    console.log("error occured during authenitcation");
  }
};

module.exports = authenticateToken;
