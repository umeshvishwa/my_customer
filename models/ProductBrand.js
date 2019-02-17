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

module.exports.findAll = function(callback){
  ProductBrand.find({}, function(err, result){
    if ( err ) throw err;
    callback(result);
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
  ProductBrand.findOne({id: id}, function(err, result){
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