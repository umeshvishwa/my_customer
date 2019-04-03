var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
var Customer = require('./models/Customer');
var familyMemberController = require("./controllers/FamilyMemberController");
var productBrandController = require("./controllers/ProductBrandController");
var productCategoryController = require("./controllers/ProductCategoryController");
var productController = require("./controllers/ProductController");
var feedbackController = require("./controllers/FeedbackController");
var Address = require('./models/Address');
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
    var customer = new Customer();
    customer.userId = req.body.userId;
    customer.first_name = req.body.first_name;
    customer.last_name = req.body.last_name;
    customer.mobile = req.body.mobile;
    customer.email = req.body.email;
    customer.birthDate = req.body.birthDate;
    customer.anniversary = req.body.anniversary;
    customer.incomeBracket = req.body.incomeBracket;
    customer.is_pc = req.body.is_pc;
    customer.pcId = req.body.pcId;
    customer.password = req.body.password;
    //Address Info
    customer.line1 = req.body.line1;
    customer.line2 = req.body.line2;
    customer.city = req.body.city;
    customer.state = req.body.state;
    customer.postal_code = req.body.postal_code;
    
    customer.save(function(err, customer) {
        if (err) {
            res.send(err);
        }
        
        res.send(customer);
    });
})

router.route('/customer/update')
.post(function(req, res) {
    const doc = {
        userId : req.body.userId,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        mobile : req.body.mobile,
        email : req.body.email,
        birthDate : req.body.birthDate,
        anniversary : req.body.anniversary,
        incomeBracket : req.body.incomeBracket,
        is_pc: req.body.is_pc,
        pcId : req.body.pcId,
        password : req.body.password,
        created: req.body.created,
        line1 : req.body.line1,
        line2 : req.body.line2,
        city : req.body.city,
        state : req.body.state,
        postal_code : req.body.postal_code
    };
    
    Customer.update({_id: req.body._id}, doc, function(err) {
        if (err)
            res.send(err);
        
        res.send(true);
    });
});

router.delete('/customer/delete', function(req, res){
    var id = req.query.id;
        
    Customer.findOne({_id: id}).remove().exec(function(err, customer) {
        if(err)
            res.send(err)
        res.send('Customer successfully removed!');
    })
});

router.get('/customer/getAll', function(req, res) {
    var userId = req.query.user;
    
    Customer.find({$and: [ {userId: userId}]}, function(err, customers) {
        if (err)
            res.send(err);
        res.json(customers);
    });

});

router.get('/customer/get', function(req, res) {
    var id = req.query.id;
    
    Customer.findOne({_id: id, userId: req.query.user}, function(err, customer) {
        if(err)
            res.send(err)
        res.json(customer);
    })

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