var nodeNestpay = require('../index.js');

nestpay = new nodeNestpay({
    name: 'AKTESTAPI',
    password: 'AKBANK01',
    clientId: 100100000,
    endpoint: 'asseco',
    currency: 'TRY'
});

nestpay.authorize({
    number: '5456165456165454',
    year: '12',
    month: '12',
    cvv: '000',
    amount: '10'
}).then(function (authorizeResult) {

    console.log('Authorized');
    console.log(authorizeResult);

    nestpay.capture({orderId: authorizeResult.OrderId}).then(function (captureResult) {

        console.log('Captured');
        console.log(captureResult);

        nestpay.void({orderId: authorizeResult.OrderId}).then(function (voidResult) {

            console.log('Canceled');
            console.log(voidResult);

        }).catch(function (voidError) {

            console.log(voidError);
        });

    }).catch(function (captureError) {

        console.log(captureError);

    });

}).catch(function (authorizeError) {

    console.log(authorizeError);

});