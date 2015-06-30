/**
 * Created by yang on 2015/6/29.
 */
var UserService = require('../service/UserService.js');
var SignParam = require('../params/users').SignParam;
var UserParam = require('../params/users').UserParam;
var errors = require('../utils/errors.js');

var UserCtrl = module.exports = {};

UserCtrl.createUser = function(req, res) {
    var p = new UserParam(req.body);
    p.updateUserId = req.user.userId;
    p.updateUserName = req.user.userName;
    UserService.createUser(p).then(function(r) {
        res.json(r);
    }).catch(function(err) {
        errors.handler(err, res);
    });
};

UserCtrl.updateUser = function(req, res) {
    var p = new UserParam(req.body);
    p.updateUserId = req.user.userId;
    p.updateUserName = req.user.userName;
    UserService.updateUser(p).then(function(r) {
        res.json(r);
    }).catch(function(err) {
        errors.handler(err, res);
    });
};

UserCtrl.listUsers = function(req, res) {
    var p = {};
    p.offset = req.query.offset && 0;
    p.limit = req.query.limit && 1000;
    UserService.listUsers(p).then(function(r) {
        res.json(r);
    }).catch(function(err) {
        errors.handler(err, res);
    });
};

UserCtrl.sign = function(req, res) {
    var p = new SignParam(req.body);
    UserService.sign(p).then(function(r) {
        res.json(r);
    }).catch(function(err) {
        errors.handler(err, res);
    });
};
