const Employee = require("../models/employee.model");

// Create and Save a new Note
exports.create = (req, res) => {
  // Create a Note
  const user = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nickname: req.body.nickname,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password
  });

  // Save User in the database
  user
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee."
      });
    });
};
