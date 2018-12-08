const mongoose = require("mongoose");

const options = { discriminatorKey: "kind" };

const userSchema = new mongoose.Schema(
  {
    name: {
      first: { type: String, required: true, max: 100, trim: true },
      last: { type: String, max: 100, trim: true }
    },
    phone: { type: String, required: true, trim: true, unique: true },
    email: { type: String, trim: true },
    password: { type: String, required: true },
    services: [mongoose.Schema.Types.ObjectId]
  },
  options
);

const User = mongoose.model("User", userSchema);

module.exports = User;
