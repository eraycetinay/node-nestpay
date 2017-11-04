var nodeNestpay = require('../index.js');

nestpay = new nodeNestpay({
    name: 'ISBANK',
    password: 'ISBANK07',
    clientId: 700100000,
    endpoint: 'asseco',
    currency: 'TRY'
});

nestpay.purchase({
    number: '5456165456165454',
    year: '12',
    month: '12',
    cvv: '000',
    amount: '10'
}).then(function(purchaseResult) {

    console.log('Purchased');
    console.log(purchaseResult);

}).catch(function(purchaseError) {

    console.log(purchaseError);

});