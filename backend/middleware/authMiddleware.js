const jwt = require("jsonwebtoken");
const secret = "process.env.SECRET";

if (!secret) {
  throw new Error("JWT Secret not set in environment variables");
}

const authenticateToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

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
    console.log(e);
    console.log("error occured during authenitcation");
  }
};

module.exports = authenticateToken;
