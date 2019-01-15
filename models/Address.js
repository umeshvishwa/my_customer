//models/Address.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var addressSchema = new Schema({
  line1: String,
  line2: String,
  city: String,
  state: String
});
module.exports = mongoose.model('Address', addressSchema);