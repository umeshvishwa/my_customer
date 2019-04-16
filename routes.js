var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
var customerController = require("./controllers/CustomerController");
var familyMemberController = require("./controllers/FamilyMemberController");
var productBrandController = require("./controllers/ProductBrandController");
var productCategoryController = require("./controllers/ProductCategoryController");
var productController = require("./controllers/ProductController");
var feedbackController = require("./controllers/FeedbackController");

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://mycustomer.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: 'https://mycustomer.auth0.com/api/v2/',
    issuer: `https://mycustomer.auth0.com/`,
    algorithms: ['RS256']
});
//router.get('/', function(req, res){
    //res.render('index')
//});

router.route('/customer/add')
.post(function(req,res) {
    customerController.addCustomer(req.body, function(results) {
        res.json(results);
    });
})

router.route('/customer/update')
.post(function(req, res) {
    customerController.updateCustomer(req.body, function(results){
        res.json(results);
    });
});

//Delete existing brand
router.delete('/customer/delete', function(req, res){
    customerController.deleteCustomer(req.params.id, function(results){
        res.json(results);
    });
});

//Get list of customer without pagination
router.get('/customer/getAll', function(req, res) {
    customerController.getAll(req.query, function(results){
        res.json(results);
    });
});

router.get('/customer/get', function(req, res) {
    customerController.getCustomerDetails(req.query, function(results){
        res.json(results);
    });
});

/*router.get('/customer/get', checkJwt, function(req, res) {
    var id = req.query.id;
    console.log(req.user);
    Customer.find({_id: id}, function(err, customer) {
        if(err)
            res.send(err)
        res.json(customer);
    })

});*/

router.route('/customer/family/add')
.post(function(req,res) {
    familyMemberController.addFamilyMember(req.body, function(results) {
        res.json(results);
    });
})

/**
 * Routes for managing product brand
 */
//Add new product brand
router.route('/product/brand')
.post(function(req,res) {
    productBrandController.addProductBrand(req.body, function(results) {
        res.json(results);
    });
})

//Get all the brands
router.get('/product/brand', function(req, res){
    productBrandController.getAllProductBrands(req.query, function(results){res.json(results);});
});

//Get all the brands without pagination
router.get('/product/brands/all', function(req, res){
    productBrandController.getAllProductBrandsWithoutPagination(req.query, function(results){res.json(results);});
});

//Update existing brand
router.route('/product/brand/:id')
.put(function(req, res){
    productBrandController.updateProductBrand(req.body, req.params.id, function(results){
        res.json(results);
    });
});

//Delete existing brand
router.delete('/product/brand/:id', function(req, res){
    productBrandController.deleteProductBrand(req.params.id, function(results){
        res.json(results);
    });
});



/**
 * Routes for managing product category
 */
//Add new product category
router.route('/product/category')
.post(function(req,res) {
    productCategoryController.addProductCategory(req.body, function(results) {
        res.json(results);
    });
})

//Get all the category
router.get('/product/category', function(req, res){
    productCategoryController.getAllProductCategory(req.query, function(results){res.json(results);});
});

//Get all the category
router.get('/product/category/all', function(req, res){
    productCategoryController.getAllProductCategoryWithoutPagination(req.query, function(results){
        res.json(results);
    });
});

//Update existing category
router.route('/product/category/:id')
.put(function(req, res){
    productCategoryController.updateProductCategory(req.body, req.params.id, function(results){
        res.json(results);
    });
});

//Delete existing category
router.delete('/product/category/:id', function(req, res){
    productCategoryController.deleteProductCategory(req.params.id, function(results){
        res.json(results);
    });
});


/**
 * Routes for managing products
 */
//Add new product
router.route('/product')
.post(function(req,res) {
    productController.addProduct(req.body, function(results) {
        res.json(results);
    });
})

//Get all the products
router.get('/products', function(req, res){
    productController.getAllProducts(req.query, function(results){res.json(results);});
});

//Get all the products without pagination
router.get('/products/all', function(req, res){
    productController.getAllProductsWithoutPagination(req.query, function(results){
        res.json(results);
    });
});

//Update existing category
router.route('/product/:id')
.put(function(req, res){
    productController.updateProduct(req.body, req.params.id, function(results){
        res.json(results);
    });
});

//Delete existing
router.delete('/product/:id', function(req, res){
    productController.deleteProduct(req.params.id, function(results){
        res.json(results);
    });
});


/**
 * Routes for managing feedbacks
 */
//Add new feedback
router.route('/feedback/add')
.post(function(req,res) {
    feedbackController.addFeedback(req.body, function(results) {
        res.json(results);
    });
})

//Get all the feedbacks
router.get('/feedbacks', function(req, res){
    feedbackController.getAllFeedbacks(req.query, function(results){res.json(results);});
});

//Get all the feedbacks without pagination
router.get('/feedbacks/all', function(req, res){
    feedbackController.getAllFeedbacksWithoutPagination(req.query, function(results){
        res.json(results);
    });
});

//Update existing category
router.route('/feedback/:id')
.put(function(req, res){
    feedbackController.updateFeedback(req.body, req.params.id, function(results){
        res.json(results);
    });
});

//Delete existing
router.delete('/feedback/:id', function(req, res){
    feedbackController.deleteFeedback(req.params.id, function(results){
        res.json(results);
    });
});


module.exports = router;