'use strict';

var crypto = require('crypto');
var xml2js = require('xml2js');
var rp = require('request-promise');
var currencyCodes = require('currency-codes');
var uuid = require('uuid/v1');

'use strict';

function nestpay(value) { 
    this.config = {
        name: value.name || '',
        password: value.password || '',
        clientId: value.clientId || '',
        storekey: value.storekey || '',
        mode: value.mode || 'P',
        currency: value.currency || 'USD',
        orderId: value.orderId || 'Auto',
        callbackSuccess: value.callbackSuccess || '',
        callbackFail: value.callbackFail || '',
        secureFormat: value.secureFormat || '',
        endpoint: value.endpoint || 'asseco',
        endpoints: {
            'test': 'https://testvpos.asseco-see.com.tr/fim/api',
            'asseco': 'https://entegrasyon.asseco-see.com.tr/fim/api',
            'isbank': 'spos.isbank.com.tr',
            'akbank': 'www.sanalakpos.com',
            'finansbank': 'www.fbwebpos.com',
            'denizbank': 'denizbank.est.com.tr',
            'kuveytturk': 'kuveytturk.est.com.tr',
            'halkbank': 'sanalpos.halkbank.com.tr',
            'anadolubank': 'anadolusanalpos.est.com.tr',
            'hsbc': 'vpos.advantage.com.tr',
            'ziraatbank': 'sanalpos2.ziraatbank.com.tr',
            'ingbank': 'ingbank.est.com.tr',
            'citibank': 'citibank.est.com.tr',
            'cardplus': 'cardplus.est.com.tr'
        },
        endpoints3d: {
            'test': 'https://testvpos.asseco-see.com.tr/fim/est3Dgate',
            'asseco': 'https://entegrasyon.asseco-see.com.tr/fim/est3Dgate',
            'isbank': 'spos.isbank.com.tr',
            'akbank': 'www.sanalakpos.com',
            'finansbank': 'www.fbwebpos.com',
            'denizbank': 'denizbank.est.com.tr',
            'kuveytturk': 'kuveytturk.est.com.tr',
            'halkbank': 'sanalpos.halkbank.com.tr',
            'anadolubank': 'anadolusanalpos.est.com.tr',
            'hsbc': 'vpos.advantage.com.tr',
            'ziraatbank': 'sanalpos2.ziraatbank.com.tr',
            'ingbank': 'ingbank.est.com.tr',
            'citibank': 'citibank.est.com.tr',
            'cardplus': 'cardplus.est.com.tr'
        },
        lang: value.endpoint || 'tr'
    }
}

require('./methods/purchase')(nestpay);
require('./methods/authorize')(nestpay);
require('./methods/void')(nestpay);
require('./methods/refund')(nestpay);
require('./methods/capture')(nestpay);
require('./methods/secure3d')(nestpay); 
require('./methods/securePurchase')(nestpay); 
require('./methods/request')(nestpay); 
module.exports = nestpay; 