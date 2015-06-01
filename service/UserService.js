/**
 * Created by yang on 2015/6/1.
 */

var VLogin = require('../models').VLogin;
var User = require('../models').User;

var SignParam = require('../params/users').SignParam;

exports.sign = function (req, res) {
    var param = new SignParam(req.body);
    console.log(req.body);
    console.log(param);
    VLogin.findOne({where: {userName: param.userName}}).then(function (login) {
        if (login) {
            User.findById(login.userId).then(function (user) {
                res.send(user.toJSON());
            });
        } else {
            res.status(404).send('username is wrong!');
        }
    });

}

