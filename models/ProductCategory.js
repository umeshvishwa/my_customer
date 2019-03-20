//models/Customer.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productCategorySchema = new Schema({
  name: String,
});
var ProductCategory = mongoose.model('ProductCategory', productCategorySchema);

module.exports.findOne = function(id, callback){
  ProductCategory.findOne({id: id}, function(err, result){
    if ( err ) throw err;
    callback(result);
  });
}

module.exports.findAll = function(reqQuery, callback){
  var page = parseInt(reqQuery.page || 0)
  var size = parseInt(reqQuery.size || 10)
  
  // Find some documents
  ProductCategory.countDocuments({},function(err,totalCount) {
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
      ProductCategory.find({},{},query,function(err,result) {
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

module.exports.addProductCategory = function(body, callback){
  var productCategory = new ProductCategory({
    name:body.name
  });

  //Saving the model instance to the DB
  productCategory.save(function(err, result){
    if ( err ) throw err;
    callback({
      messaage:"Successfully added a product category.",
      productCategory:result
    });
  });
}

module.exports.updateProductCategory = function(body, id, callback){
  ProductCategory.findOne({_id: id}, function(err, result){
    if ( err ) throw err;

    if(!result){
      callback({
        message:"Product category with ID: " + id+" not found.",
      });
    }

    result.name   = body.name;
    
    result.save(function(err, result){
      if ( err ) throw err;
      callback({
        message:"Successfully updated the category",
        productCategory: result
      });
    });

  });
}