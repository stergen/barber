const mongoose = require('mongoose');
const options = { discriminatorKey: 'kind' };

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, max: 100, trim: true },
  lastName: { type: String, required: true, max: 100, trim: true },
  nickname: { type: String, required: true, unique: true, max: 50, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  phone: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, },
  services: [ mongoose.Schema.Types.ObjectId ]
}, options);

const User = mongoose.model('User', userSchema);

module.exports = User;
