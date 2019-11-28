//models/Address.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paseFlyerSchema = new Schema({
  title: String,
  hostedBy: String,
  venue: String,
  topics: Array
});
var PaseFlyer  = mongoose.model('PaseFlyer', paseFlyerSchema);

module.exports.getAllFlyers = function(reqQuery, callback){
  
  PaseFlyer.find({},{},function(err,result) {
    // Mongo command to fetch all data from collection.
    if(err) {
        response = {"error" : true,"message" : "Error fetching data"};
    } else {
      response = {"error" : false,"result" : result};
    }
    callback(response);
  });
}

module.exports.addPaseFlyer = function(body, callback){
  var paseFlyer = new PaseFlyer({
    title: body.title,
    hostedBy: body.hostedBy,
    venue: body.venue,
    topics: body.topics
  });

  //Saving the model instance to the DB
  paseFlyer.save(function(err, result){
    if ( err ) throw err;
    callback({
      messaage:"Successfully added a pase flyer.",
      paseFlyer:result
    });
  });
}

module.exports.updateFlyer = function(body, id, callback){
  PaseFlyer.findOne({_id: id}, function(err, result){
    if ( err ) throw err;

    if(!result){
      callback({
        message:"Flyer with ID: " + id+" not found.",
      });
    }

    result.title   = body.title;
    result.hostedBy = body.hostedBy;
    result.venue = body.venue;
    result.topics = body.topics;

    result.save(function(err, result){
      if ( err ) throw err;
      callback({
        message:"Successfully updated the flyer",
        paseFlyer: result
      });
    });

  });
}