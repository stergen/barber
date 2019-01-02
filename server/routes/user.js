const users = require("../controllers/user.controller.js");

module.exports = app => {
  app.post("/users", users.create);

  app.get("/users", users.findAll);

  app.get("/users/me", users.getUser);

  app.post("/users/login", users.login);

  app.get("/users/logout", users.logout);

  app.get("/users/:userId", users.findOne);

  app.put("/users/:userId", users.update);

  app.delete("/users/:userId", users.delete);
};
