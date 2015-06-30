/**
 * Created by yang on 2015/6/1.
 */
var sequelize = require('../models').sequelize;
var User = require('../models').User;
var Seq = require('../utils/Seq.js');

var UserService = module.exports = {};

UserService.createUser = function(param) {
    return new Promise(function(resolve, reject) {
        Seq.getNextId().then(function(id) {
            param.userId = id;
            sequelize.transaction(function(t) {
                return User.create(param,  {transaction: t});
            }).then(resolve).catch(reject);
        });
    });
};

UserService.updateUser = function(param) {
    return new Promise(function(resolve, reject) {
        sequelize.transaction(function (t) {
            return User.update(param, {where: {userId: param.userId}}, {transaction: t});
        }).then(resolve).catch(reject);
    });
};

UserService.listUsers = function(param) {
    return new Promise(function(resolve, reject) {
        User.findAndCountAll({
            where: {userStatus: 0},
            order: ['userName'],
            offset: param.offset,
            limit: param.limit
        }).then(function (result) {
            var r = {};
            r.count = result.count;
            r.users = result.rows;

            resolve(r);
        }).catch(reject);
    });
};

UserService.sign = function(param) {
    return new Promise(function(resolve, reject) {
        User.findOne({where: {userName: param.userName}}).then(function (user) {
            if (user) {
                resolve(user);
            } else {
                var err = new Error('Not Found:' + param.userName);
                reject(err);
            }
        }).catch(reject);
    })
};


