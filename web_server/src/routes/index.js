const film = require("./Film");
const user = require("./User");
const Comment = require("./Comment");
const actor = require("./Actor");
const type = require("./Type");

const routes = (app) => {
  app.use("/films", film);
  app.use("/users/", user);
  app.use("/comments/", Comment);
  app.use("/actors/", actor);
  app.use("/types/", type);
};

module.exports = routes;
