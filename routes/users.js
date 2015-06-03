var express = require('express');
var UserService = require('../service/UserService.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/sign', UserService.sign);

router.get('/list', UserService.listUsers);

router.put('/', UserService.updateUser);

module.exports = router;
