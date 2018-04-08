'use strict';

var crypto = require('crypto');
var currencyCodes = require('currency-codes');

module.exports = function (nestpay) {
    nestpay.prototype.securePurchase = function (value = {}) {
        var that = this;
        return new Promise(function (resolve, reject) {
            var currencyNumber = currencyCodes.code(value.currency || that.config.currency);
            currencyNumber = currencyNumber ? currencyNumber.number : '';

            var data = {
                Name: that.config.name,
                Password: that.config.password,
                ClientId: that.config.clientId,
                Mode: that.config.mode,
                Type: 'Auth',
                Currency: currencyNumber,
                Taksit: value.installment || undefined,
                OrderId: value.orderId ? value.orderId : value.oid,
                GroupId: value.groupId || '',
                TransId: value.transId || '',
                UserId: value.userId || '',
                Total: value.amount || '',
                CardholderPresentCode: '13', //
            };
            var sha = crypto.createHash('sha1').update(value.HASHPARAMSVAL + (value.storekey || that.config.storekey)).digest('base64');
            if (sha != value.HASH) {
                reject();
            }
            else {
                data.Number = value.md;
                data.PayerTxnId = value.xid;
                data.PayerSecurityLevel = value.eci;
                data.PayerAuthenticationCode = value.cavv;

                var url = that.config.endpoints[that.config.endpoint];
                that.request(url, data).then(resolve).catch(reject);
            }
        });
    }
}
