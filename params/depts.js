/**
 * Created by yang on 2015/6/29.
 */
var _ = require('lodash');
var depts = module.exports = {};

depts.DeptParam = function(attrs) {
    this.deptId = undefined;
    this.parentId = undefined;
    this.deptName = undefined;

    attrs && _.extend(this,  attrs);
};
