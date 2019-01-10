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
module.exports = mongoose.model('Feedback', feedbackSchema);