//models/FamilyMember.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FamilyMemberSchema = new Schema({
  name: String,
  birthDate: String,
  relation: String,
  customer: {type: Schema.Types.ObjectId, ref: 'Customer'}
});
var FamilyMember = mongoose.model('FamilyMember', FamilyMemberSchema);

module.exports.addFamilyMember = function(body, callback){
  var familyMember = new FamilyMember({
    name:body.name,
    birthDate: body.birthDate,
    relation: body.relation,
    customer: body.customer
  });

  //Saving the model instance to the DB
  familyMember.save(function(err, result){
    if ( err ) throw err;
    callback({
      messaage:"Successfully added a family member.",
      familyMember:result
    });
  });
}