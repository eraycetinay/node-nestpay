'use strict';

var currencyCodes = require('currency-codes');
var uuid = require('uuid/v1');

module.exports = function(nestpay) {
    nestpay.prototype.authorize = function(value = {}) {
        var that = this;
        return new Promise(function(resolve, reject) {
            var currencyNumber = currencyCodes.code(value.currency || that.config.currency);
            currencyNumber = currencyNumber ? currencyNumber.number : '';
            var order = value.orderId ? (value.orderId == 'Auto' ? uuid() : value.orderId) : (that.config.orderId == 'Auto' ? uuid() : '')

            var data = {
                Name: that.config.name,
                Password: that.config.password,
                ClientId: that.config.clientId,
                Mode: that.config.mode,
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
                Cvv2Val: value.cvv || ''
            };

            var url=that.config.endpoints[value.endpoint || that.config.endpoint];
            that.request(url,data).then(resolve).catch(reject);
        });
    }
}