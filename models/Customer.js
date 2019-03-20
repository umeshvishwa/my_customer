//models/Customer.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var customerSchema = new Schema({
  userId: String,
  firstName: String,
  lastName: String,
  mobile: Number,
  email: String,
  birthDate: String,
  anniversary: String,
  incomeBracket: String,
  line1: String,
  line2: String,
  city: String,
  state: String,
  postalCode: String,  
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  isPc: false,
  pcId: Number,
  password: String,
  created: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', customerSchema);