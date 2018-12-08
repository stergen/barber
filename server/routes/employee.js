module.exports = app => {
  const employers = require("../controllers/employee.controller");

  app.post("/employers", employers.create);

  app.get("/employers", employers.findAll);

  app.get("/employers/:employeeId", employers.findOne);

  app.put("/employers/:employeeId", employers.update);

  app.delete("/employers/:employeeId", employers.delete);
};
