var productCategoryDao = require("../models/ProductCategory");

module.exports.addProductCategory = function(body, callback){
    console.log("Adding new product category");
    productCategoryDao.addProductCategory(body, callback);
}

module.exports.getProductCategoryDetails = function(params, callback){
    console.log("Fetching details for category: " + params.id);
    productCategoryDao.findOne(params.id, callback);
}

module.exports.getAllProductCategory = function(query, callback){
    console.log("Fetching all category");
    productCategoryDao.findAll(query, callback);
}

module.exports.updateProductCategory = function(body, id, callback){
    console.log("Editing Category");
    productCategoryDao.updateProductCategory(body, id, callback);
}
module.exports.deleteProductCategory = function(isbn, callback){
    console.log("Deleting category");
    productCategoryDao.deleteProductCategory(id, callback);
}