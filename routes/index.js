const TAG = '[route]';
var express = require('express');
var logger = require('../utils/logger.js');
var errors = require('../utils/errors.js');
var config = require('../config.json');
var User = require('../models').User;
var _ = require('lodash');

var router = module.exports = express.Router();

// log
router.use(function (req, res, next) {
    req.realIp = req.headers['x-real-ip'];
    var params = '';
    var tp = req.headers['content-type'] || '';
    if (req.body
        && (req.method === 'POST' || req.method === 'PUT')
        && (tp.indexOf('json') != -1 || tp.indexOf('text') != -1)) {
        params += "[body]: " + JSON.stringify(req.body);
    }

    logger.debug(TAG, 'uri:', req.url, ",", params);
    next();
});

// check token
router.use(/^\/(?!pub\/).*$/, function (req, res, next) {
    var token = req.headers.ct || req.query.ct || req.cookies.ct;

    var check = false;
    if (token) {
        // TODO
        check = true;
    }
    if (check) {
        req.token = token;
        next();
    } else {
        var err = new errors.ServiceError(errors.codes.err_token);
        err.status = 403;
        err.message = 'token error';
        next(err);
    }
});

// user
router.use(/^\/(?!pub\/).*$/, function (req, res, next) {
    var token = req.token;
    // TODO
    var userId = token;
    req.userId = userId;
    User.findById(userId).then(function (user) {
        if(user){
            req.user = user;
            next();
        }
        else{
            var err = new errors.ServiceError(errors.codes.err_token);
            err.status = 403;
            err.message = 'token invalid';
            next(err);
        }

    }).catch(function (err) {
        next(err);
    });
});

// routes
router.use(require('./users.js'));

// catch 404 and forward to error handler
router.use(function (req, res, next) {
    var err = new errors.ServiceError(errors.codes.err_404);
    err.status = 404;
    err.message = req.url + ' is not found';
    next(err);
});

// error handlers

// production error handler
// no stacktraces leaked to user
router.use(function (err, req, res, next) {
    errors.handler(err, res);
});
