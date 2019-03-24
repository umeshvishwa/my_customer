var productDao = require("../models/Product");

module.exports.addProduct = function(body, callback){
    console.log("Adding new product");
    productDao.addProduct(body, callback);
}

module.exports.getProductDetails = function(params, callback){
    console.log("Fetching details for product: " + params.id);
    productDao.findOne(params.id, callback);
}

module.exports.getAllProducts = function(query, callback){
    console.log("Fetching all products");
    productDao.findAll(query, callback);
}

module.exports.updateProduct = function(body, id, callback){
    console.log("Editing product");
    productDao.updateProduct(body, id, callback);
}
module.exports.deleteProduct = function(isbn, callback){
    console.log("Deleting product");
    productDao.deleteProduct(id, callback);
}