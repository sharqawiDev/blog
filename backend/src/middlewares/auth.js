const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Token not provided." });
  }

  jwt.verify(token, "your-secret-key", (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
