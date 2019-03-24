//models/Customer.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productBrandSchema = new Schema({
  name: String,
});

var ProductBrand  = mongoose.model('ProductBrand', productBrandSchema);

module.exports.findOne = function(id, callback){
  ProductBrand.findOne({id: id}, function(err, result){
    if ( err ) throw err;
    callback(result);
  });
}

module.exports.findAll = function(reqQuery, callback){
  var page = parseInt(reqQuery.page || 0)
  var size = parseInt(reqQuery.size || 10)
  
  // Find some documents
  ProductBrand.countDocuments({},function(err,totalCount) {
    var query = {}

    if(page < 0 || page === 0) {
      response = {"error" : true,"message" : "invalid page number, should start with 1"};
      callback(response);
      return;
    }
    query.skip = size * (page - 1)
    query.limit = size
    
    if(err) {
      response = {"error" : true,"message" : "Error fetching data"}
    } else {
      ProductBrand.find({},{},query,function(err,result) {
        // Mongo command to fetch all data from collection.
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
          response = {"error" : false,"result" : result,"totalCount": totalCount};
        }
        callback(response);
      });
    }
  })
}

module.exports.findAllBrands = function(reqQuery, callback){
  
  ProductBrand.find({},{},function(err,result) {
    // Mongo command to fetch all data from collection.
    if(err) {
        response = {"error" : true,"message" : "Error fetching data"};
    } else {
      response = {"error" : false,"result" : result};
    }
    callback(response);
  });
}

module.exports.addProductBrand = function(body, callback){
  var productBrand = new ProductBrand({
    name:body.name
  });

  //Saving the model instance to the DB
  productBrand.save(function(err, result){
    if ( err ) throw err;
    callback({
      messaage:"Successfully added a product brand.",
      productBrand:result
    });
  });
}

module.exports.updateProductBrand = function(body, id, callback){
  ProductBrand.findOne({_id: id}, function(err, result){
    if ( err ) throw err;

    if(!result){
      callback({
        message:"Product brand with ID: " + id+" not found.",
      });
    }

    result.name   = body.name;
    
    result.save(function(err, result){
      if ( err ) throw err;
      callback({
        message:"Successfully updated the brand",
        productBrand: result
      });
    });

  });
}