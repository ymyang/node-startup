var express = require('express');
var UserCtrl = require('../controller/UserCtrl.js');
var DeptCtrl = require('../controller/DeptCtrl.js');
var router = module.exports = express.Router();

// 管理员创建用户
router.post('/ad/user', UserCtrl.createUser);

// 普通用户取用户列表
router.get('/users', UserCtrl.listUsers);

// 创建部门
router.post('/ad/dept', DeptCtrl.createDept);

// 修改部门
router.put('/ad/dept', DeptCtrl.updateDept);

// 获取部门列表
router.get('/depts', DeptCtrl.listDepts);

// 获取单个部门详情
router.get('/dept', DeptCtrl.getDept);

// 删除部门
router.delete('/ad/dept', DeptCtrl.deleteDept);
