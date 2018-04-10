var nodeNestpay = require('../index.js');

nestpay = new nodeNestpay({
    name: 'AKTESTAPI',
    password: 'AKBANK01',
    clientId: 100100000,
    endpoint: 'asseco',
    currency: 'TRY'
});

nestpay.refund({
    orderId: '341d9dd0-c19a-11e7-b5fc-fb7c0064167d',
    amount: '10'
}).then(function (refundResult) {

    console.log('Refunded');
    console.log(refundResult);

}).catch(function (refundError) {

    console.log(refundError);

});