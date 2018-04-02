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
            'isbank': 'https://spos.isbank.com.tr/fim/api',
            'akbank': 'https://www.sanalakpos.com/fim/api',
            'finansbank': 'https://www.fbwebpos.com/fim/api',
            'denizbank': 'https://denizbank.est.com.tr/fim/api',
            'kuveytturk': 'https://kuveytturk.est.com.tr/fim/api',
            'halkbank': 'https://sanalpos.halkbank.com.tr/fim/api',
            'anadolubank': 'https://anadolusanalpos.est.com.tr/fim/api',
            'hsbc': 'https://vpos.advantage.com.tr/fim/api',
            'ziraatbank': 'https://sanalpos2.ziraatbank.com.tr/fim/api',
            'ingbank': 'https://sanalpos.ingbank.com.tr/fim/api',
            'citibank': 'https://citibank.est.com.tr/fim/api',
            'cardplus': 'https://cardplus.est.com.tr/fim/api'
        },
        endpoints3d: {
            'test': 'https://testvpos.asseco-see.com.tr/fim/est3Dgate',
            'asseco': 'https://entegrasyon.asseco-see.com.tr/fim/est3Dgate',
            'isbank': 'https://spos.isbank.com.tr/fim/est3Dgate',
            'akbank': 'https://www.sanalakpos.com/fim/est3Dgate',
            'finansbank': 'https://www.fbwebpos.com/fim/est3Dgate',
            'denizbank': 'https://denizbank.est.com.tr/fim/est3Dgate',
            'kuveytturk': 'https://kuveytturk.est.com.tr/fim/est3Dgate',
            'halkbank': 'https://sanalpos.halkbank.com.tr/fim/est3Dgate',
            'anadolubank': 'https://anadolusanalpos.est.com.tr/fim/est3Dgate',
            'hsbc': 'https://vpos.advantage.com.tr/fim/est3Dgate',
            'ziraatbank': 'https://sanalpos2.ziraatbank.com.tr/fim/est3Dgate',
            'ingbank': 'https://sanalpos.ingbank.com.tr/fim/est3Dgate',
            'citibank': 'https://citibank.est.com.tr/fim/est3Dgate',
            'cardplus': 'https://cardplus.est.com.tr/fim/est3Dgate'
        },
        lang: value.lang || 'tr'
    }
}

require('./methods/purchase')(nestpay);
require('./methods/authorize')(nestpay);
require('./methods/void')(nestpay);
require('./methods/refund')(nestpay);
require('./methods/capture')(nestpay);
require('./methods/secure3d')(nestpay); 
require('./methods/securePurchase')(nestpay); 
require('./methods/secureAuthorize')(nestpay); 
require('./methods/request')(nestpay); 
module.exports = nestpay; 
