const mongoose = require('mongoose');
mongoose.promise = Promise;

const GUserSchema = new mongoose.Schema({
  name: { type: String, unique: false },
  email: { type: String, unique: false },
  googleId: { type: String, unique: true },
});

module.exports = GUser = mongoose.model('GUser', GUserSchema);
