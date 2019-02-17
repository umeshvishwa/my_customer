var familyMemberDao = require("../models/FamilyMember");
module.exports.addFamilyMember = function(body, callback){
    console.log("Adding new family member");
    familyMemberDao.addFamilyMember(body, callback);
}