/**
 * Created by yang on 2015/6/1.
 */

var UserService = require('../service/UserService.js');

exports.sign = function(req, res) {
    UserService.sign(req, res);
};

exports.listUsers = function(req, res) {
    UserService.listUsers(req, res);
};

exports.updateUser = function(req, res) {
    UserService.updateUser(req,  res);
}
