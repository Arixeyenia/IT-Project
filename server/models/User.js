const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, unique: false },
  email: { type: String, unique: true },
  googleId: { type: String, unique: true },
});

module.exports = User = mongoose.model('user', UserSchema);
