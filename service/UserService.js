/**
 * Created by yang on 2015/6/1.
 */
var sequelize = require('../models').sequelize;
var VLogin = require('../models').VLogin;
var LoginAccount = require('../models').LoginAccount;
var User = require('../models').User;

var SignParam = require('../params/users').SignParam;
var UserParam = require('../params/users').UserParam;

exports.sign = function (req, res) {
    var param = new SignParam(req.body);
    VLogin.findOne({where: {userName: param.userName}}).then(function (login) {
        if (login) {
            User.findById(login.userId).then(function (user) {
                //res.send(user.toJSON());
                res.json(user);
            });
        } else {
            res.status(404).send('username is wrong!');
        }
    });
};

exports.listUsers = function (req, res) {
    var offset = req.query.offset;
    var limit = req.query.limit;
    if (offset === undefined || offset < 0) {
        offset = 0;
    }
    if (limit === undefined || limit < 0) {
        limit = 1000;
    }
    User.findAndCountAll({
        where: {deleted: 0},
        order: ['userName'],
        offset: offset,
        limit: limit
    }).then(function (result) {
        var r = {};
        r.count = result.count;
        r.userSelect = result.rows;

        res.json(result);
    });
};

exports.updateUser = function (req, res) {
    var param = new UserParam(req.body);
    var u = {};
    if (param.userName) {
        u.userName = param.userName;
    }
    if (param.realName) {
        u.realName = param.realName;
    }
    if (param.title) {
        u.jobTitle = param.title;
    }
    if (param.email) {
        u.mail = param.email;
    }
    if (param.mobile) {
        u.mobile = param.mobile;
    }
    if (param.tel) {
        u.phone = param.tel;
    }
    sequelize.transaction(function (t) {
        if (param.userName) {
            return Promise.all([
                User.update(u, {where: {userId: param.userId}}, {transaction: t}),
                LoginAccount.update({userName: param.userName}, {where: {userId: param.userId}}, {transaction: t})
            ]);
        } else {
            return User.update(u, {where: {userId: param.userId}}, {transaction: t});
        }
    }).then(function (result) {
        User.findById(param.userId).then(function (user) {
            res.json(user);
        });
    }).catch(function (err) {
        throw err;
    });
};


