'use strict';

var crypto = require('crypto');
var currencyCodes = require('currency-codes');
var uuid = require('uuid/v1');
var ejs = require('ejs');
var fs = require('fs');

module.exports = function(nestpay) {
    nestpay.prototype.secure3d = function(value = {}) {
        var that = this;
        return new Promise(function(resolve, reject) {
            var currencyNumber = currencyCodes.code(value.currency || that.config.currency);
            currencyNumber = currencyNumber ? currencyNumber.number : '';
            var order = value.orderId ? (value.orderId == 'Auto' ? uuid() : value.orderId) : (that.config.orderId == 'Auto' ? uuid() : '')

            var data = {
                form: {
                    clientId: that.config.clientId,
                    oid: order,
                    amount: value.amount || '',
                    okUrl: value.callbackSuccess || that.config.callbackSuccess,
                    failUrl: value.callbackFail || that.config.callbackFail,
                    rnd: value.timestamp || new Date().getTime(),
                    currency: currencyNumber,
                    pan: value.number || '',
                    Ecom_Payment_Card_ExpDate_Year: value.year || '',
                    Ecom_Payment_Card_ExpDate_Month: value.month || '',
                    cv2: value.cvv || '',
                    storetype: '3d',
                    lang: value.lang || that.config.lang
                },
                url: that.config.endpoints3d[that.config.endpoint]
            };
            var hashstr = data.form.clientId + data.form.oid + data.form.amount + data.form.okUrl + data.form.failUrl + data.form.rnd + (value.storekey || that.config.storekey);
            data.form.hash = crypto.createHash('sha1').update(hashstr).digest('base64');

            if ((!value.secureFormat && that.config.secureFormat == 'html') || (value.secureFormat && value.secureFormat.toLowerCase() == 'html')) {
                var content = fs.readFileSync(require('path').resolve(__dirname, `../templates/secure.html`), 'utf8');
                resolve(ejs.render(content, { postData: data }));
            } else {
                resolve(data);
            }
        });
    }
}
