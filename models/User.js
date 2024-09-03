const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  displayName: String,
  hashedPassword: String,
  photoUrl: String,
  status: String,
  uid: String,
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
