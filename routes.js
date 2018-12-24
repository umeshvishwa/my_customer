var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
var Customer = require('./models/Customer');

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

router.route('/insert')
.post(function(req,res) {
    var customer = new Customer();
    customer.userId = req.body.userId;
    customer.name = req.body.name;
    customer.mobile = req.body.mobile;
    customer.emailId = req.body.emailId;
    customer.birthDate = req.body.birthDate;
    customer.anniversary = req.body.anniversary;
    customer.incomeBracket = req.body.incomeBracket;
    customer.pcId = req.body.pcId;
    customer.password = req.body.password;

    customer.save(function(err) {
        if (err)
        res.send(err);
        res.send('Customer successfully added!');
    });

})

router.route('/update')
.post(function(req, res) {
    const doc = {
        userId : req.body.userId,
        name : req.body.name,
        mobile : req.body.mobile,
        emailId : req.body.emailId,
        birthDate : req.body.birthDate,
        anniversary : req.body.anniversary,
        incomeBracket : req.body.incomeBracket,
        pcId : req.body.pcId,
        password : req.body.password,
        created: req.body.created
    };
    console.log(doc);
    Customer.update({_id: req.body._id}, doc, function(err, result) {
        if (err)
            res.send(err);
        res.send('Customer successfully updated!');
    });
});

router.get('/delete', function(req, res){
    var id = req.query.id;
    Customer.find({_id: id}).remove().exec(function(err, customer) {
        if(err)
            res.send(err)
        res.send('Customer successfully deleted!');
    })
});

router.get('/getAll',function(req, res) {
    var userId = req.query.user;
    Customer.find({$and: [ {userId: userId}]}, function(err, customers) {
        if (err)
            res.send(err);
        res.json(customers);
    });

});

router.get('/get', checkJwt, function(req, res) {
    var id = req.query.id;
    console.log(req.user);
    Customer.find({_id: id}, function(err, customer) {
        if(err)
            res.send(err)
        res.json(customer);
    })

});

module.exports = router;