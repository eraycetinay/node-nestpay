'use strict';

module.exports = function (nestpay) {
    nestpay.prototype.capture = function (value = {}) {
        var that = this;
        return new Promise(function (resolve, reject) {
            var data = {
                Name: that.config.name,
                Password: that.config.password,
                ClientId: that.config.clientId,
                Type: 'PostAuth',
                OrderId: value.orderId
            };

            var url = that.config.endpoints[that.config.endpoint];
            that.request(url, data).then(resolve).catch(reject);
        });
    }
}