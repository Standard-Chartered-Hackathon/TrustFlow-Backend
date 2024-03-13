// models/user.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  isKYC: Boolean,
  accountNumber: String,
  password: String,
  userId: String,
  username: String,
  dateOfBirth: String,
  incomeRange: String,
  aadhaarCardNo: String,
  panCardNo: String,
});

const userData = mongoose.model("User", userSchema);

module.exports = userData;
