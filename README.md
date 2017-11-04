# node-nestpay
[![npm version](https://badge.fury.io/js/node-nestpay.svg)](https://badge.fury.io/js/node-nestpay) 
[![dependency Status](https://david-dm.org/eraycetinay/node-nestpay.svg)](https://david-dm.org/eraycetinay/node-nestpay.svg)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

A NodeJS module to interface with Nestpay Payment Gateway.

## Installation
```
npm install node-nestpay
```
## Methods
- Purchase
- Authorize
- Capture
- Void
- Refund
- Secure3d
- Secure3d Purchase
## Endpoints
- İş Bankası
- Akbank
- Finansbank
- Denizbank
- Kuveytturk
- Halkbank
- Anadolubank
- ING Bank
- Citibank
- Cardplus
- Ziraat Bankası
## Examples
**Purchase, Authorize, Capture, Void, Refund, Secure3d, Secure3dPurchase examples can be found in examples folder.**
```
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
```
