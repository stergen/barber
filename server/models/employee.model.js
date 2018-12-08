const mongoose = require("mongoose");
const User = require("./user.model");

const options = { discriminatorKey: "kind" };

const employeeSchema = new mongoose.Schema(
  {
    description: { type: String },
    instagram: { type: String, trim: true }
  },
  options
);

const Employee = User.discriminator("Employee", employeeSchema, options);

module.exports = Employee;
