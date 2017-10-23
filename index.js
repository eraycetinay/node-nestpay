'use strict';

var crypto = require('crypto');
var xml2js = require('xml2js');
var rp = require('request-promise');
var currencyCodes = require('currency-codes');
var uuid = require('uuid/v1');


var nestpay = function(value) {
    this.config = {
        name: value.name || '',
        password: value.password || '',
        clientId: value.clientId || '',
        mode: value.mode || 'P',
        currency: value.currency || 'USD',
        ip: value.ip || '127.0.0.1',
        orderId: value.orderId || '',
        endpoint: 'asseco',
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
        }
    }
}

nestpay.prototype.purchase = function(value = {}) {
    var that = this;
    return new Promise(function(resolve, reject) {
        var currencyNumber = currencyCodes.code(value.currency || that.config.currency);
        currencyNumber = currencyNumber ? currencyNumber.number : '';
        var order = value.orderId ? (value.orderId == 'Auto' ? uuid() : value.orderId) : (that.config.orderId == 'Auto' ? uuid() : '')

        var data = {
            Name: value.name || that.config.name,
            Password: value.password || that.config.password,
            ClientId: value.clientId || that.config.clientId,
            Mode: value.mode || that.config.mode,
            type: 'Auth',
            Currency: currencyNumber,
            Taksit: value.installment || 1,
            OrderId: order,
            GroupId: value.groupId || '',
            TransId: value.transId || '',
            UserId: value.userId || '',
            Total: value.amount || '',
            Number: value.number || '',
            Expires: (value.month || '') + '/' + (value.year || ''),
            Cvv2Val: value.cvv || '',
            IPAddress: value.ip || that.config.ip,
        };

        that.request(data).then(resolve).catch(reject);

    });
}

nestpay.prototype.authorize = function(value = {}) {
    var that = this;
    return new Promise(function(resolve, reject) {
        var currencyNumber = currencyCodes.code(value.currency || that.config.currency);
        currencyNumber = currencyNumber ? currencyNumber.number : '';
        var order = value.orderId ? (value.orderId == 'Auto' ? uuid() : value.orderId) : (that.config.orderId == 'Auto' ? uuid() : '')

        var data = {
            Name: value.name || that.config.name,
            Password: value.password || that.config.password,
            ClientId: value.clientId || that.config.clientId,
            Mode: value.mode || that.config.mode,
            Type: 'PreAuth',
            Currency: currencyNumber,
            Taksit: value.installment || that.config.installment,
            OrderId: order,
            GroupId: value.groupId || '',
            TransId: value.transId || '',
            UserId: value.userId || '',
            Total: value.amount || '',
            Number: value.number || '',
            Expires: (value.month || '') + '/' + (value.year || ''),
            Cvv2Val: value.cvv || '',
            IPAddress: value.ip || that.config.ip,
        };

        that.request(data).then(resolve).catch(reject);

    });
}

nestpay.prototype.void = function(value = {}) {
    var that = this;
    return new Promise(function(resolve, reject) {
        var data = {
            Name: value.name || that.config.name,
            Password: value.password || that.config.password,
            ClientId: value.clientId || that.config.clientId,
            Type: 'Void',
            OrderId: value.orderId
        };

        that.request(data).then(resolve).catch(reject);

    });
}

nestpay.prototype.refund = function(value = {}) {
    var that = this;
    return new Promise(function(resolve, reject) {
        var data = {
            Name: value.name || that.config.name,
            Password: value.password || that.config.password,
            ClientId: value.clientId || that.config.clientId,
            Type: 'Credit',
            OrderId: value.orderId,
            Total: value.amount,
        };

        that.request(data).then(resolve).catch(reject);

    });
}

nestpay.prototype.capture = function(value = {}) {
    var that = this;
    return new Promise(function(resolve, reject) {
        var data = {
            Name: value.name || that.config.name,
            Password: value.password || that.config.password,
            ClientId: value.clientId || that.config.clientId,
            Type: 'PostAuth',
            OrderId: value.orderId
        };

        that.request(data).then(resolve).catch(reject);

    });
}


nestpay.prototype.request = function(data) {
    var that = this;
    return new Promise(function(resolve, reject) {
        var xmlValues = new xml2js.Builder({ rootname: 'CC5Request' });
        var convertedObjects = xmlValues.buildObject({ CC5Request: data });
        var options = {
            method: 'POST',
            url: that.config.endpoints[that.config.endpoint],
            body: convertedObjects,
            headers: { 'Content-Type': 'text/xml' }
        };
        rp(options).then(function(body) {
            xml2js.parseString(body, { explicitArray: false, trim: true },
                function(errorParsed, bodyParsed) {
                    if (errorParsed || !bodyParsed || !bodyParsed.CC5Response) {
                        reject(body);
                    } else if (bodyParsed.CC5Response.ProcReturnCode == '00' && bodyParsed.CC5Response.Response == 'Approved') {
                        resolve(bodyParsed.CC5Response);
                    } else {
                        reject(bodyParsed);
                    }
                }
            );
        }).catch(function(err) {
            reject(errorGateway);
        });
    });
}



module.exports = nestpay;