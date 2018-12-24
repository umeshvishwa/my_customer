//models/Customer.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var customerSchema = new Schema({
  userId: String,
  name: String,
  mobile: Number,
  emailId: String,
  birthDate: String,
  anniversary: String,
  incomeBracket: String,
  pcId: Number,
  password: String,
  created: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Customer', customerSchema);