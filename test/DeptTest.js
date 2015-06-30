/**
 * Created by yang on 2015/6/25.
 */
var sequelize = require('../models').sequelize;
var Department = require('../models').Department;

function initDepts(start, count) {
    var i = start;
    var max = i + count;
    for(; i < max; i++) {
        var dept = {};
        dept.deptId = i;
        dept.parentIds = '';
        dept.deptName = '部门测试-' + i;
        dept.createrId = 0;
        dept.createrName = 'yliyun';
        dept.createTime = new Date();
        Department.create(dept).then(function(r) {

        });
    }
}

function insertDept(deptId, parentId) {
    console.log('start');
    var start = new Date().getTime();

    var dept = {};
    dept.deptId = deptId;
    dept.deptName = '部门测试-' + deptId;
    dept.createrId = 0;
    dept.createrName = 'yliyun';
    dept.createTime = new Date();

    new Promise(function(resolve, reject) {
        if (parentId) {
            dept.parentId = parentId;
            Department.findById(parentId).then(function(d) {
                console.log('parent:', d.toJSON());
                if (d.parentIds) {
                    resolve(d.parentIds + '-' + d.deptId);
                } else {
                    resolve('-' + d.deptId);
                }
            });
        } else {
            resolve('');
        }
    }).then(function(parentIds) {
            console.log('parentIds:', parentIds);
            dept.parentIds = parentIds;
            sequelize.transaction(function(t) {
                return Department.create(dept, {transaction: t})
            }).then(function(result) {
                var c = new Date().getTime() - start;
                console.log('time:', c);
            }).catch(function(err) {
                throw err;
            });
        }).catch(function(err) {
            throw err;
        });
}

function delDept(deptId) {
    var start = new Date().getTime();
    Department.findById(deptId).then(function(d) {
        console.log('dept:', d.toJSON());
        sequelize.transaction(function(t) {
            return Department.destroy({where: {$or: [{deptId: deptId}, {parentIds: {$like: d.parentIds + '-' + d.deptId + '%'}}]}, transaction: t})
        }).then(function(result) {
            var c = new Date().getTime() - start;
            console.log('time:', c);
        });
    });
}

//initDepts(900100, 100000);

insertDept(99);

//delDept(99);


