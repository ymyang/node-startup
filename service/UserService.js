/**
 * Created by yang on 2015/6/1.
 */
const TAG = 'UserService';
var Promise = require('bluebird');
var sequelize = require('../models').sequelize;
var User = require('../models').User;
var seq = require('../utils/seq.js');
var common = require('../utils/common.js');
var errors = require('../utils/errors.js');
var logger = require('../utils/logger.js');
var UserDTO = require('../dto').UserDTO;

var UserService = module.exports = {};

/**
 * 创建用户
 */
UserService.createUser = function(param) {
    param.userPwd = param.password;
    param.sysUser = false;

    // 检查用户是否已经存在
    return _checkSameUser(param).then(function() {
        // 新建用户
        return _doCreateUser(param);
    });
};

function _doCreateUser(param) {
    var _user = undefined;

    if (param.user) {
        param.updateUserId = param.user.userId;
        param.updateUserName = common.displayName(param.user);
    }
    param.sysUser = false;
    param.updateTime = common.now();

    // 取用户id
    return seq.getNextId().then(function(id) {
        param.userId = id;
        // 开启事务
        return sequelize.transaction(function(t) {
            // 插入用户
            return User.create(param, {transaction: t});
        });
    }).then(function() {
        return new UserDTO(_user);
    });
}

/**
 * 查找用户
 */
UserService.listUsers = function(param) {
    var opts = {
        where: {},
        order: [
            sequelize.literal('convert(real_name using gbk)'),
            sequelize.literal('convert(user_name using gbk)')
        ],
        offset: param.offset,
        limit: param.limit
    };
    if (param.deptId) {
        if (param.deptId > 0) {
            opts.where.deptId = param.deptId;
        } else if (param.deptId == -1) {
            opts.where.deptId = null;
        }
    }
    if (param.searchKey) {
        opts.where.$or = [
            { userName: { $like: '%' + param.searchKey + '%' } },
            { realName: { $like: '%' + param.searchKey + '%' } }
        ];
    }

    return User.findAndCountAll(opts).then(function (r) {
        return {
            count: r.count,
            users: r.rows.map(function(row) {
                return new UserDTO(row.dataValues);
            })
        };
    });
};
