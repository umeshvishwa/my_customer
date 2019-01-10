//models/Customer.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = new Schema({
  name: String,
  category: {type: Schema.Types.ObjectId, ref: 'ProductCategory'},
  brand: {type: Schema.Types.ObjectId, ref: 'ProductBrand'}
});
module.exports = mongoose.model('Product', productSchema);