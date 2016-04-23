/**
 * Created by yang on 2015/6/29.
 */
var util = require('util');
var Promise = require('bluebird');
var _ = require('lodash');
var sequelize = require('../models').sequelize;
var Department = require('../models').Department;
var seq = require('../utils/seq.js');
var constants = require('../utils/constants.js');
var common = require('../utils/common.js');
var errors = require('../utils/errors.js');
var DeptDTO = require('../dto').DeptDTO;

var DeptService = module.exports = {};

/**
 * 创建部门
 */
DeptService.createDept = function (param) {
    return _checkSameDept(param).then(function () {
        return _doCreateDept(param);
    });
};

function _checkSameDept(dept) {
    var opts = {
        where: {
            parentId: dept.parentId || null,
            deptName: dept.deptName
        }
    };
    if (dept.deptId) {
        opts.where.deptId = { $ne: dept.deptId};
    }
    return Department.findOne(opts).then(function(row) {
        if (row) {
            errors.throwErr(errors.codes.err_deptname_same, dept.deptName + ' already exists');
        }
        return;
    });
}

function _doCreateDept(param) {
    var dept = {
        parentId: param.parentId || null,
        deptName: param.deptName,
        folderSize: param.folderSize || null,
        updateTime: common.now()
    };
    if (param.user) {
        dept.updateUserId = param.user.userId;
        dept.updateUserName = common.displayName(param.user);
    }
    return seq.getNextId().then(function (id) {
        dept.deptId = id;
        return _getParentIdsAndLayer(dept.parentId);
    }).then(function(r) {
        dept.parentIds = r.parentIds;
        dept.layer = r.layer;
        return _createDeptFolder(dept, param.user, r.fileId);
    }).then(function(folder) {
        if (folder) {
            dept.fileId = folder.fileId;
        }
        return sequelize.transaction(function (t) {
            return Department.create(dept, {transaction: t});
        });
    }).then(function() {
        return _log(dept, constants.op.newdept, param);
    }).then(function() {
        return new DeptDTO(dept);
    });
}

function _createDeptFolder(dept, user, parentFolderId) {
    var p = {
        fileCategory: constants.FILE_CATEGORY.PUBLIC_FILE,
        deptId: dept.deptId,
        parentId: parentFolderId,
        fileName: dept.deptName,
        user: user
    };
    return FileService.createDeptFolder(p);
}

/**
 * 修改部门
 */
DeptService.updateDept = function (param) {
    var dept = undefined;
    return Department.findById(param.deptId).then(function(row) {
        dept = row.dataValues;

        return sequelize.transaction(function (t) {
            var update = {
                deptName: param.deptName,
                folderSize: param.folderSize || null,
                updateUserId: param.user.userId,
                updateUserName: common.displayName(param.user),
                updateTime: common.now()
            };
            _.assign(dept, update);

            var opts = {
                where: {
                    deptId: param.deptId
                },
                transaction: t
            };
            return Department.update(update, opts);
        });
    }).then(function () {
        return _log(dept, constants.op.renamedept, param);
    }).then(function() {
        return new DeptDTO(dept);
    });
};

/**
 * find departments list
 */
DeptService.listDepts = function (param) {
    var opts = {
        where: {},
        order: [sequelize.literal('convert(dept_name using gbk)')],
        offset: param.offset,
        limit: param.limit
    };

    if (param.parentId == -1) {
        opts.where.parentId = null;
    } else if (param.parentId) {
        opts.where.parentId = param.parentId;
    }

    if (param.searchKey) {
        opts.where.deptName = {
            $like: '%' + param.searchKey + '%'
        };
    }

    return Department.findAndCountAll(opts).then(function (r) {
        return {
            count: r.count,
            depts: r.rows.map(function(row) {
                return new DeptDTO(row.dataValues);
            })
        };
    });
};

/**
 * 获取单个部门信息
 */
DeptService.getDept = function (param) {
    return Department.findById(param.deptId).then(function(row) {
        return new DeptDTO(row.dataValues);
    });
};

/**
 * delete department
 */
DeptService.deleteDept = function (param) {
    var _dept = undefined;
    return Department.findById(param.deptId).then(function (dept) {
        if (!dept) {
            var err = new errors.ServiceError(errors.codes.err_dept_notexist);
            err.message = "deptId " + param.deptId + ' not exists';
            throw err;
        }
        _dept = dept;

        return sequelize.transaction(function(t) {
            var opts = {
                where: { $or: [
                    { deptId: param.deptId },
                    { parentIds: { $like: _dept.parentIds + _dept.deptId + '-%'}}
                ]},
                transaction: t
            };
            return Department.destroy(opts);
        });
    }).then(function() {
        return _log(_dept, constants.op.deldept, param);
    }).then(function() {
        return;
    });
};

function _getAllSubDeptIds(dept) {
    var opts = {
        attributes: ['deptId'],
        where: {
            parentIds: { $like: dept.parentIds + dept.deptId + '-%'}
        }
    };
    return Department.findAll(opts).then(function(rows) {
        return rows.map(function(r) {
            return r.dataValues.deptId
        });
    });
}

/**
 * 通过 parentId 获取 parentIds和layer
 */
function _getParentIdsAndLayer(parentId) {
    var r = {
        parentIds: '-',
        layer: 0
    };
    if (parentId) {
        return Department.findById(parentId).then(function(row) {
            if (!row) {
                var err = new errors.ServiceError(errors.codes.err_parentdept_notexist);
                err.message = 'deptId '+parentId + ' not exists';
                throw err;
            }
            r.parentIds = row.dataValues.parentIds || '-';
            r.parentIds += row.dataValues.deptId + '-';
            r.layer = row.dataValues.layer + 1;
            r.fileId = row.dataValues.fileId;
            return r;
        })
    } else {
        return Promise.resolve(r);
    }
}

function _log(depts, op, param, desc) {
    // TODO
    return;
}

DeptService.doCreateDept = _doCreateDept;