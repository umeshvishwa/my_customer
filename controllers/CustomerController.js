var customerDao = require("../models/Customer");

module.exports.addCustomer = function(body, callback){
    console.log("Adding new customer");
    customerDao.addCustomer(body, callback);
}

module.exports.getCustomerDetails = function(query, callback){
    console.log("Fetching details for customer: " + query.id);
    customerDao.findOne(query.id, callback);
}

module.exports.getAll = function(query, callback){
    console.log("Fetching all customers");
    customerDao.findAll(query, callback);
}
/*
module.exports.getAllProductBrandsWithoutPagination = function(query, callback){
    console.log("Fetching all brands");
    productBrandDao.findAllBrands(query, callback);
}
*/
module.exports.updateCustomer = function(body, callback){
    console.log("Editing Brand");
    customerDao.updateCustomer(body, callback);
}

module.exports.deleteCustomer = function(id, callback){
    console.log("Deleting customer");
    customerDao.deleteCustomer(id, callback);
}