/**
 * Created by yang on 2015/6/29.
 */
var UserService = require('../service/UserService.js');
var common = require('../utils/common.js');

var UserCtrl = module.exports = {};

/**
 * 创建用户
 */
UserCtrl.createUser = function(req, res) {
    var p = {
        deptId: req.body.deptId,
        userName: req.body.userName,
        realName: req.body.realName,
        title: req.body.title,
        jobNumber: req.body.jobNumber,
        gender: req.body.gender,
        birth: req.body.birth,
        mail: req.body.mail,
        tel: req.body.tel,
        mobile: req.body.mobile,
        password: req.body.password,
        diskSize: req.body.diskSize
    };
    common.reqHandler(req, res, UserService.createUser, p);
};

/**
 * 用户查找用户
 */
UserCtrl.listUsers = function (req, res) {
    var p = {
        deptId: req.query.di,
        searchKey: req.query.key
    };
    common.reqHandler(req, res, UserService.listUsers, p);
};
