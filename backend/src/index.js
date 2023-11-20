const express = require("express");
require("dotenv").config();
const app = express();
const db = require("./db");
require("./models");
const cors = require("cors");
const { PORT } = process.env;

app.use(express.json());
app.use(cors());
require("./controllers")(app);

const createDB = async () => {
  try {
    await db.authenticate({ logging: false });
    console.log("Connection has been established successfully.");
    await db.sync({ logging: false });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

(async () => {
  await createDB();
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
})();
