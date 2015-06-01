var express = require('express');
var UserCtrl = require('../controller/UserCtrl.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/sign', UserCtrl.sign);

module.exports = router;
