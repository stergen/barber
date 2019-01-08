const mongoose = require("mongoose");

if (process.env.NODE_ENV === "test") {
  mongoose.models = {};
  mongoose.modelSchemas = {};
}

const options = { discriminatorKey: "kind" };

const userSchema = new mongoose.Schema(
  {
    name: {
      first: { type: String, required: true, max: 100, trim: true },
      last: { type: String, max: 100, trim: true }
    },
    phone: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, trim: true },
    services: [mongoose.Schema.Types.ObjectId]
  },
  options
);

module.exports = mongoose.model("User", userSchema);
