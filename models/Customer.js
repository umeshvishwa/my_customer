//models/Customer.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var customerSchema = new Schema({
  userId: String,
  fname: String,
  lname: String,
  mobile: Number,
  emailId: String,
  birthDate: String,
  anniversary: String,
  incomeBracket: String,
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  pcId: Number,
  password: String,
  created: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Customer', customerSchema);