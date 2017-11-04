var nodeNestpay = require('../index.js');
var express = require('express');
var bodyParser = require('body-parser');
var app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

nestpay = new nodeNestpay({
    clientId: '150150100',
    name: 'INGBANKAPI',
    password: 'INGBANK15',
    storekey: 'TRPS1234',
    callbackSuccess: 'http://localhost:3000/success',
    callbackFail: 'http://localhost:3000/fail',
    endpoint: 'asseco',
    currency: 'TRY',
});

app.get('/', function(req, res) {

    nestpay.secure3d({
        number: '4022774022774026',
        year: '30',
        month: '12',
        cvv: '000',
        amount: '10',
        secureFormat: 'html'
    }).then(function(secure3dResult) {

        res.send(secure3dResult);

    }).catch(function(secure3dError) {

        res.send(secure3dError);

    });

})

app.post('/fail', function(req, res) {
    res.send(req.body);
});

app.post('/success', function(req, res) {

    nestpay.securePurchase({
        md: req.body.md,
        xid: req.body.xid,
        eci: req.body.eci,
        HASH: req.body.HASH,
        cavv: req.body.cavv,
        HASHPARAMSVAL: req.body.HASHPARAMSVAL,
        oid: req.body.oid,
        amount: '10',
    }).then(function(securePurchaseResult) {

        res.send(securePurchaseResult);

    }).catch(function(securePurchaseError) {

        res.send(securePurchaseError);

    });
});

app.listen(3000, function() {
    console.log('Example is ready. (Url: localhost:3000)');
})