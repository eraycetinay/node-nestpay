'use strict';

var xml2js = require('xml2js');
var rp = require('request-promise');

module.exports = function (nestpay) {
    nestpay.prototype.request = function (url, data) {
        var that = this;
        return new Promise(function (resolve, reject) {
            var xmlValues = new xml2js.Builder({rootname: 'CC5Request'});
            var convertedObjects = xmlValues.buildObject({CC5Request: data});
            var options = {
                method: 'POST',
                url: url,
                body: convertedObjects,
                headers: {'Content-Type': 'text/xml'}
            };
            rp(options).then(function (body) {
                xml2js.parseString(body, {explicitArray: false, trim: true},
                    function (errorParsed, bodyParsed) {
                        if (errorParsed || !bodyParsed || !bodyParsed.CC5Response) {
                            reject(body);
                        }
                        else if (bodyParsed.CC5Response.ProcReturnCode == '00' && bodyParsed.CC5Response.Response == 'Approved') {
                            resolve(bodyParsed.CC5Response);
                        }
                        else {
                            reject(bodyParsed);
                        }
                    }
                );
            }).catch(function (err) {
                reject(errorGateway);
            });
        });
    }
}