const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Token not provided." });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
