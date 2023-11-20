module.exports = (app) => {
  require("./user")(app);
  require("./post")(app);
  require("./comment")(app);
};
