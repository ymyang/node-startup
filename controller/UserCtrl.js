/**
 * Created by yang on 2015/6/1.
 */

var UserService = require('../service/UserService.js');

exports.sign= function(req, res) {
    UserService.sign(req, res);
};
