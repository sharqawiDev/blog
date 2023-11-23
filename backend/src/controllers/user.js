const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
  app.post("/register", async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(firstName, lastName, email, hashedPassword);
      const user = await db.models.User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      res.json({ user, message: "User registered successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error registering user." });
    }
  });

  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await db.models.User.findOne({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      // Compare the provided password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      // If the credentials are valid, generate a JWT token
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h", // Token expires in 2 hours
        }
      );

      res.json({ token, message: "Login successful." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error logging in." });
    }
  });
};
