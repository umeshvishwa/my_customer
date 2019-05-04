//models/Customer.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var customerSchema = new Schema({
  userId: String,
  firstName: String,
  lastName: String,
  mobile: Number,
  email: String,
  birthDate: String,
  anniversary: String,
  incomeBracket: String,
  line1: String,
  line2: String,
  city: String,
  state: String,
  postalCode: String,  
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  isPc: false,
  pcId: Number,
  password: String,
  created: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now }
});

var Customer = mongoose.model('Customer', customerSchema);

module.exports.findOne = function(id, callback){
  Customer.findOne({_id: id}, function(err, result){
    if ( err ) throw err;
    
    callback(result);
  });
}
/*
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
*/
module.exports.findAll = function(reqQuery, callback){
  Customer.find({userId: reqQuery.user},{},function(err,customers) {
    // Mongo command to fetch all data from collection.
    if(err) {
        response = {"error" : true,"message" : "Error fetching data"};
    } else {
      response = {"error" : false, customers};
    }
    callback(response);
  });
}

module.exports.addCustomer = function(body, callback){
  var customer = new Customer();
  customer.userId = body.userId;
  customer.firstName = body.firstName;
  customer.lastName = body.lastName;
  customer.mobile = body.mobile;
  customer.email = body.email;
  customer.birthDate = body.birthDate;
  customer.anniversary = body.anniversary;
  customer.incomeBracket = body.incomeBracket;
  customer.isPc = body.isPc;
  customer.pcId = body.pcId;
  customer.password = body.password;
  //Address Info
  customer.line1 = body.line1;
  customer.line2 = body.line2;
  customer.city = body.city;
  customer.state = body.state;
  customer.postalCode = body.postalCode;
  
  //Saving the model instance to the DB
  customer.save(function(err, customer) {
    if ( err ) throw err;
    callback({
      messaage:"Successfully added new customer.",
      customer
    });
  });
}

module.exports.updateCustomer = function(body, callback){
  var id = body._id;
  Customer.findOne({_id: id}, function(err, customer){
    if ( err ) throw err;

    if(!customer){
      callback({
        message:"Customer with ID: " + id+" not found.",
      });
    }

    customer.userId = body.userId;
    customer.firstName = body.firstName;
    customer.lastName = body.lastName;
    customer.mobile = body.mobile;
    customer.email = body.email;
    customer.birthDate = body.birthDate;
    customer.anniversary = body.anniversary;
    customer.incomeBracket = body.incomeBracket;
    customer.isPc = body.isPc;
    customer.pcId = body.pcId;
    customer.password = body.password;
    //Address Info
    customer.line1 = body.line1;
    customer.line2 = body.line2;
    customer.city = body.city;
    customer.state = body.state;
    customer.postalCode = body.postalCode;
    
    customer.save(function(err, result){
      if ( err ) throw err;
      callback({
        message:"Successfully updated customer",
        customer: result
      });
    });
  });
}

module.exports.deleteCustomer = function(id, callback){
  Customer.findOne({_id: id}).remove().exec(function(err, customer) {
    if ( err ) throw err;
    callback({
      message:"Successfully deleted customer",
      customer: customer
    });
  })
}