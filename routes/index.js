const TAG = '[route]';
var express = require('express');
var Encrypt = require('../utils/Encrypt.js');
var logger = require('../utils/logger.js');
var errors = require('../utils/errors.js');
var BaseDTO = require('../dto/BaseDTO.js');
var User = require('../models').User;

var router = express.Router();

// log
router.use(function (req, res, next) {
    var params = '';
    var str = req.headers['content-type'] || '';
    var mime = str.split(';')[0];
    if (req.body && mime === 'application/json') {
        params += "[body]: " + JSON.stringify(req.body);
    }
    logger.debug(TAG, 'uri:', req.url, ",", params);
    next();
});

// check token
router.use('/*', function (req, res, next) {
    var token = req.headers.ct;
    var check = Encrypt.checkToken(token);
    if (check) {
      next();
    } else {
      res.status(403).send('token error')
    }
});

// user
router.use('/*', function (req, res, next) {
    var token = req.headers.ct;
    var userId = Encrypt.getUserId(token);
    User.findById(userId).then(function (user) {
      req.user = user;
      next();
    });
});

router.use(require('./users.js'));

// catch 404 and forward to error handler
router.use(function (req, res, next) {
    var err = new Error('Not Found:' + req.url);
    err.status = 404;
    next(err);
});

// error handlers

// production error handler
// no stacktraces leaked to user
router.use(function (err, req, res, next) {
    errors.handler(err, res);
});

module.exports = router;
