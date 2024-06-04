const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  companyName: { type: String, required: true },
  accessCode: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
