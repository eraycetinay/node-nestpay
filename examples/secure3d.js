var nodeNestpay = require('../index.js');

nestpay = new nodeNestpay({
    clientId: '150150100',
    name: 'INGBANKAPI',
    password: 'INGBANK15',
    storekey: 'TRPS1234',
    callbackSuccess: 'http://localhost:3000/success',
    callbackFail: 'http://localhost:3000/fail',
    endpoint3d: 'asseco',
    currency: 'TRY',
});

nestpay.secure3d({
    number: '4022774022774026',
    year: '30',
    month: '12',
    cvv: '000',
    amount: '10'
}).then(function(secure3dResult) {

    console.log(secure3dResult);

}).catch(function(secure3dError) {

    console.log(secure3dError);

});