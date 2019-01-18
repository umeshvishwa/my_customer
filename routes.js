var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
var Customer = require('./models/Customer');
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

module.exports = router;