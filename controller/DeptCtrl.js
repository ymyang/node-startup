/**
 * Created by yang on 2015/6/29.
 */
var DeptService = require('../service/DeptService.js');
var common = require('../utils/common.js');

var DeptCtrl = module.exports = {};

/**
 * create department
 */
DeptCtrl.createDept = function(req, res) {
    var p = {
        parentId: req.body.parentId,
        deptName: req.body.deptName,
        folderSize: req.body.folderSize
    };
    common.reqHandler(req, res, DeptService.createDept, p);
};

/**
 * update department
 */
DeptCtrl.updateDept = function(req, res) {
    var p = {
        deptId: req.body.deptId,
        deptName: req.body.deptName,
        folderSize: req.body.folderSize
    };
    common.reqHandler(req, res, DeptService.updateDept, p);
};

/**
 * 查询所有部门列表
 */
DeptCtrl.listDepts = function(req, res) {
    var p = {
        parentId: req.query.di,
        searchKey: req.query.key
    };
    common.reqHandler(req, res, DeptService.listDepts, p);
};

/**
 * 获取单个部门详情
 */
DeptCtrl.getDept = function(req, res) {
    var p = {
        deptId: req.query.di
    };
    common.reqHandler(req, res, DeptService.getDept, p);
};

/**
 * 删除部门
 */
DeptCtrl.deleteDept = function(req, res) {
    var p = {
        deptId: req.query.di
    };
    common.reqHandler(req, res, DeptService.deleteDept, p);
};
