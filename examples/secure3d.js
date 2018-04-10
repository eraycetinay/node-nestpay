var nodeNestpay = require('../index.js');

nestpay = new nodeNestpay({
    name: 'AKTESTAPI',
    password: 'AKBANK01',
    clientId: 100100000,
    storekey: '123456',
    callbackSuccess: 'http://localhost:3000/success',
    callbackFail: 'http://localhost:3000/fail',
    endpoint: 'asseco',
    currency: 'TRY',
});

nestpay.secure3d({
    number: '4022774022774026',
    year: '30',
    month: '12',
    cvv: '000',
    amount: '10'
}).then(function (secure3dResult) {

    console.log(secure3dResult);

}).catch(function (secure3dError) {

    console.log(secure3dError);

});