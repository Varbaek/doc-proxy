/*
 *	Helper file to manage all the rquired activities for forwarding request
 * 	This file will be helpful in saving request data
 */

var requestProxy = require('express-request-wrapper');
var parser = require('./parser');

var autodocProxy = function() {

    var public = {};

    public.proxyGetRequest = function(req, cb) {
        var url = req.query.url;
        requestProxy.makeGetCall(url, req.query, req.headers,
            function(err, body, response) {
                if (err) {
                    return cb(err, body, response);
                }
                var parsedPair = {
                    'request': response.request,
                    'response': response
                };
                var blueprint = parser.format(parsedPair);
                console.log(blueprint);
                body = JSON.parse(body);
                return cb(err, body, response);
            });
    };

    public.proxyPostRequest = function(req, cb){
        var url = req.query.url, isForm = false;
        if(req.headers['content-type'] == 'application/x-www-form-urlencoded')
            isForm = true;
        requestProxy.makePostCall(url, req.body, req.headers,
            function(err, body, response) {
                if (err) {
                    return cb(err, body, response);
                }
                var parsedPair = {
                    'request': response.request,
                    'response': response
                };
                var blueprint = parser.format(parsedPair);
                console.log(blueprint);
                body = JSON.parse(body);
                return cb(err, body, response);
            }, isForm);
    };

    public.proxyPatchRequest = function(req, cb){
        var url = req.query.url;
        requestProxy.makePatchCall(url, req.body, req.headers,
            function(err, body, response) {
                if (err) {
                    return cb(err, body, response);
                }
                var parsedPair = {
                    'request': response.request,
                    'response': response
                };
                var blueprint = parser.format(parsedPair);
                console.log(blueprint);
                body = JSON.parse(body);
                return cb(err, body, response);
            });
    };

    public.proxyDeleteRequest = function(req, cb){
        var url = req.query.url;
        requestProxy.makeDeleteCall(url, req.headers,
            function(err, body, response) {
                if (err) {
                    return cb(err, body, response);
                }
                var parsedPair = {
                    'request': response.request,
                    'response': response
                };
                var blueprint = parser.format(parsedPair);
                console.log(blueprint);
                body = JSON.parse(body);
                return cb(err, body, response);
            });
    };
    return public;
}

module.exports = autodocProxy();