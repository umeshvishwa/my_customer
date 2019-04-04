//models/Feedbac.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var feedbackSchema = new Schema({
  deliveryDate: Date,
  offerGiven: String,
  firstCall: Date,
  secondCall: Date,
  serviceRating: {type: Number, min: 1, max: 5, default:0},
  productRating: {type: Number, min: 1, max: 5, default:0},
  referenceGiven: String,
  remarks: String,
  product: {type: Schema.Types.ObjectId, ref: 'Product'},
  customer: {type: Schema.Types.ObjectId, ref: 'Customer'}
});

var Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports.findOne = function(id, callback){
  Feedback.findOne({id: id}, function(err, result){
    if ( err ) throw err;
    callback(result);
  });
}

module.exports.findAll = function(reqQuery, callback){
  var page = parseInt(reqQuery.page || 0),
  size = parseInt(reqQuery.size || 10),
  orderBy = reqQuery.orderBy || 'deliveryDate',
  orderDirection = reqQuery.orderDir || -1,
  cid = reqQuery.cid || '';

  // Find some documents
  Feedback.countDocuments({},function(err,totalCount) {
    var query = {}, sort = {}

    if(page < 0 || page === 0) {
      response = {"error" : true,"message" : "invalid page number, should start with 1"};
      callback(response);
      return;
    } else if (cid !== '') {
      response = {"error" : true,"message" : "invalid customer id"};
      callback(response);
      return;
    }
    query.skip = size * (page - 1)
    query.limit = size

    sort[orderBy] = orderDirection;

    if(err) {
      response = {"error" : true,"message" : "Error fetching data"}
    } else {
      Feedback.find({customer: cid})
      .skip(query.skip)
      .limit(query.limit)
      .sort( sort )
      .populate('product')
      .populate('customer')
      .exec(function(err,result) {
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

/**
 * Get all list of category without pagination
 */
module.exports.findAllFeedbacks = function(query, callback){
  
  var orderBy = query.orderBy || 'deliveryDate',
  orderDirection = query.orderDir || -1,
  cid = query.cid || '',
  sort = {};

  sort[orderBy] = orderDirection;

  // Find some documents
  Feedback.find({customer: cid})
  .sort( sort )
  .populate('product')
  .populate('customer')
  .exec(function(err,result) {
    // Mongo command to fetch all data from collection.
    if(err) {
        response = {"error" : true,"message" : "Error fetching data"};
    } else {
      response = {"error" : false,"result" : result};
    }
    callback(response);
  });
}

module.exports.addFeedback = function(body, callback){
  var feedback = new Feedback({
    deliveryDate: body.deliveryDate,
    offerGiven: body.offerGiven,
    firstCall: body.firstCall,
    secondCall: body.secondCall,
    serviceRating: body.serviceRating,
    productRating: body.productRating,
    referenceGiven: body.referenceGiven,
    remarks: body.remarks,
    product: body.product._id,
    customer: body.customer._id
  });

  //Saving the model instance to the DB
  feedback.save(function(err, result){
    if ( err ) throw err;
    callback({
      messaage:"Successfully added a feedback.",
      feedback:result
    });
  });
}

module.exports.updateFeedback = function(body, id, callback){
  Feedback.findOne({_id: id}, function(err, result){
    if ( err ) throw err;

    if(!result){
      callback({
        message:"Feedback with ID: " + id+" not found.",
      });
    }

    result.deliveryDate = body.deliveryDate;
    result.offerGiven = body.offerGiven;
    result.firstCall = body.firstCall;
    result.secondCall = body.secondCall;
    result.serviceRating = body.serviceRating;
    result.productRating = body.productRating;
    result.referenceGiven = body.referenceGiven;
    result.remarks = body.remarks;
    result.product = body.product._id;

    result.save(function(err, result){
      if ( err ) throw err;
      callback({
        message:"Successfully updated the feedback",
        feedback: result
      });
    });

  });
}

module.exports.deleteFeedback = function(id, callback){
  Feedback.findOne({_id: id}).remove().exec(function(err, feedback) {
    if ( err ) throw err;

    callback({
      messaage: 'Feedback successfully removed!',
      feedback
    });
    
  })
}