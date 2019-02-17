var productBrandDao = require("../models/ProductBrand");

module.exports.addProductBrand = function(body, callback){
    console.log("Adding new product brand");
    productBrandDao.addProductBrand(body, callback);
}

module.exports.getProductBrandDetails = function(params, callback){
    console.log("Fetching details for book with ISBN: " + params.id);
    productBrandDao.findOne(params.id, callback);
}

module.exports.getAllProductBrands = function(callback){
    console.log("Fetching all brands");
    productBrandDao.findAll(callback);
}

module.exports.updateProductBrand = function(body, id, callback){
    console.log("Editing Brand");
    productBrandDao.updateProductBrand(body, id, callback);
}
module.exports.deleteProductBrand = function(isbn, callback){
    console.log("Deleting brand");
    productBrandDao.deleteProductBrand(id, callback);
}