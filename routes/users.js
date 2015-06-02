var express = require('express');
var UserCtrl = require('../controller/UserCtrl.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/sign', UserCtrl.sign);

router.get('/list', UserCtrl.listUsers);

router.put('/', UserCtrl.updateUser);

module.exports = router;
