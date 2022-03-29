# node-nestpay

[![npm version](https://badge.fury.io/js/node-nestpay.svg)](https://badge.fury.io/js/node-nestpay)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

A NodeJS module to interface with Nestpay Payment Gateway.

## Installation

```
npm install node-nestpay
```

## Methods

-  Purchase
-  Authorize
-  Capture
-  Void
-  Refund
-  Secure3d
-  SecurePurchase
-  SecureAuthorize

## Endpoints

-  İş Bankası
-  Akbank
-  Finansbank
-  Denizbank
-  Kuveytturk
-  Halkbank
-  Anadolubank
-  ING Bank
-  Citibank
-  Cardplus
-  Ziraat Bankası
-  Türk Ekonomi Bankası

## Initialization

**Basic Setup**

```
var nodeNestpay = require('node-nestpay');
nestpay = new nodeNestpay({
    name: '******',
    password: '******',
    clientId: '******',
    endpoint: 'asseco'
});
```

**Options:**

-  name: Required,
-  password: Required,
-  clientId: Required,
-  storekey: Required for 3d,
-  callbackSuccess: Required for 3d,
-  callbackFail: Required for 3d,
-  mode: Default: 'P', 'T' for test,
-  currency: Default: 'USD', Any valid currency code,
-  orderId: Default: '', 'Auto' for random id by uuidv1,
-  secureFormat: Default: '', 'html' for html form.
-  storetype: Default: '3d',
-  endpoint: Default: 'asseco', Any valid endpoint name,
-  lang: Default: 'tr', Any valid language code for 3d screen

### Methods

#### Purchase

```
nestpay.purchase({
    //required options
    number: '5456165456165454',
    year: '12',
    month: '12',
    cvv: '000',
    amount: '10'
    //additional options
    installment: 3,
    orderId: '123456',
    groupId: '123456',
    transId: '123456',
})
```

#### Authorize

```
nestpay.authorize({
    //required options
    number: '5456165456165454',
    year: '12',
    month: '12',
    cvv: '000',
    amount: '10'
    //additional options
    installment: 3,
    orderId: '123456',
    groupId: '123456',
    transId: '123456',
})
```

#### Capture

```
nestpay.capture({
    //required options
    orderId: '123456'
})
```

#### Refund

```
nestpay.refund({
    //required options
    orderId: '123456',
    amount: 10
})
```

#### Void

```
nestpay.void({
    //required options
    orderId: '123456'
})
```

#### Secure3d

```
nestpay.secure3d({
    //required options
    number: '5456165456165454',
    year: '12',
    month: '12',
    cvv: '000',
    amount: '10'
    //additional options
    orderId: '123456',
    groupId: '123456',
    transId: '123456',
    lang: 'tr',
    timestamp: '1509830052240',
    secureFormat: 'html'
    storetype: '3d'
})
```

#### SecurePurchase

```
nestpay.securePurchase({
    //required options
    HASHPARAMSVAL: 'xxx',
    HASH: 'xxx',
    md: 'xxx',
    xid: 'xxx',
    eci: 'xxx',
    cavv: 'xxx',
    amount: '10'
    //additional options
    installment: 3,
    orderId: '123456',
    groupId: '123456',
    transId: '123456',
})
```

#### SecureAuthorize

```
nestpay.secureAuthorize({
    //required options
    HASHPARAMSVAL: 'xxx',
    HASH: 'xxx',
    md: 'xxx',
    xid: 'xxx',
    eci: 'xxx',
    cavv: 'xxx',
    amount: '10'
    //additional options
    installment: 3,
    orderId: '123456',
    groupId: '123456',
    transId: '123456',
})
```

### Endpoint List

```
//You can use any of this as endpoint parameter in initialization.
'test', 'asseco', 'isbank', 'akbank', 'finansbank', 'denizbank', 'kuveytturk', 'halkbank', 'anadolubank', 'hsbc', 'ziraatbank, 'ingbank, 'citibank', 'teb'
```

## Examples

**Purchase, Authorize, Capture, Void, Refund, Secure3d, SecurePurchase examples can be found in examples folder.**

```
var nodeNestpay = require('../index.js');

nestpay = new nodeNestpay({
    name: '******',
    password: '******',
    clientId: '******',
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

## License

[MIT](LICENSE) license.
