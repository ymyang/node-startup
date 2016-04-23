/**
 * Created by yang on 2015/6/27.
 */
var Encrypt = require('../utils/encrypt.js');

describe('test encrypt.js', function() {
    it('randomStr', function() {
        console.log(Encrypt.randomStr(32).toUpperCase());
        console.log(Encrypt.randomStr(12));
        console.log(new Date().valueOf());
    });
    it('sha256', function() {
        console.log(Encrypt.sha256('123456'));
    });
    it.only('createToken', function() {
        var token = Encrypt.createToken(101);
        console.log(Encrypt.checkToken(token));
        console.log(token);
        console.log(token.length);
        console.log(Encrypt.getUserId(token));
    });
    it('encrypt', function() {
        var pwd = Encrypt.encrypt('yliyun123');
        console.log(pwd);
        console.log(Encrypt.decrypt(pwd));
    });
});
