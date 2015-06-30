/**
 * Created by yang on 2015/6/29.
 */

var DeptService = require('../service/DeptService.js');
var DeptParam = require('../params/depts').DeptParam;

var DeptCtrl = module.exports = {};

DeptCtrl.createDept = function(req, res) {
    var param = new DeptParam(req.body);
    param.user = req.user;
    DeptService.createDept(param);
};