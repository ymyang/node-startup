var express = require('express');
var UserCtrl = require('../controller/UserCtrl.js');
var router = express.Router();

// 创建用户
router.post('/user', UserCtrl.createUser);

// 修改用户
router.put('/user', UserCtrl.updateUser);

/* GET users listing. */
router.get('/users', UserCtrl.listUsers);

router.post('/users/sign', UserCtrl.sign);

module.exports = router;
