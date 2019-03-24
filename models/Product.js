//models/Customer.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = new Schema({
  name: String,
  category: {type: Schema.Types.ObjectId, ref: 'ProductCategory'},
  brand: {type: Schema.Types.ObjectId, ref: 'ProductBrand'}
});
var Product = mongoose.model('Product', productSchema);

module.exports.findOne = function(id, callback){
  Product.findOne({id: id}, function(err, result){
    if ( err ) throw err;
    callback(result);
  });
}

module.exports.findAll = function(reqQuery, callback){
  var page = parseInt(reqQuery.page || 0)
  var size = parseInt(reqQuery.size || 10)
  
  // Find some documents
  Product.countDocuments({},function(err,totalCount) {
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
      Product.find({},{},query,function(err,result) {
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

module.exports.addProduct = function(body, callback){
  var product = new Product({
    name:body.name,
    category: body.category,
    brand: body.brand
  });

  //Saving the model instance to the DB
  product.save(function(err, result){
    if ( err ) throw err;
    callback({
      messaage:"Successfully added a product.",
      product:result
    });
  });
}

module.exports.updateProduct = function(body, id, callback){
  Product.findOne({_id: id}, function(err, result){
    if ( err ) throw err;

    if(!result){
      callback({
        message:"Product with ID: " + id+" not found.",
      });
    }

    result.name   = body.name;
    
    result.save(function(err, result){
      if ( err ) throw err;
      callback({
        message:"Successfully updated the product",
        product: result
      });
    });

  });
}