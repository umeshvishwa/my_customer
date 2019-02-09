//models/FamilyMember.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FamilyMemberSchema = new Schema({
  name: String,
  birthDate: String,
  relation: String,
  customer: {type: Schema.Types.ObjectId, ref: 'Customer'}
});
module.exports = mongoose.model('FamilyMember', FamilyMemberSchema);