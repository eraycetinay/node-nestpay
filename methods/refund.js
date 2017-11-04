'use strict';

module.exports = function(nestpay) {
    nestpay.prototype.refund = function(value = {}) {
        var that = this;
        return new Promise(function(resolve, reject) {
            var data = {
                Name: that.config.name,
                Password: that.config.password,
                ClientId: that.config.clientId,
                Type: 'Credit',
                OrderId: value.orderId,
                Total: value.amount,
            };

            var url=that.config.endpoints[value.endpoint || that.config.endpoint];
            that.request(url,data).then(resolve).catch(reject);
        });
    }
}