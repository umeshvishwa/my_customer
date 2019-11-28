var paseFlyerDao = require("../models/PaseFlyer");
module.exports.addPaseFlyer = function(body, callback){
    console.log("Adding new pase flyer");
    paseFlyerDao.addPaseFlyer(body, callback);
}
module.exports.getAllFlyers = function(query, callback){
    console.log("Fetching all flyers");
    paseFlyerDao.getAllFlyers(query, callback);
}
module.exports.updateFlyer = function(body, id, callback){
    console.log("Editing flyer");
    paseFlyerDao.updateFlyer(body, id, callback);
}