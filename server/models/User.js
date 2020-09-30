const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, unique: false },
  email: { type: String, unique: false },
  googleId: { type: String, unique: true },
});

module.exports = User = mongoose.model('user', UserSchema);
