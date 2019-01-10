//models/Kid.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var kidSchema = new Schema({
  name: String,
  birthDate: String,
  customer: {type: Schema.Types.ObjectId, ref: 'Customer'}
});
module.exports = mongoose.model('Kid', kidSchema);