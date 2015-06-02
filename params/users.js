/**
 * Created by yang on 2015/6/1.
 */
var _ = require('lodash');
var users = module.exports = {};

users.SignParam = function(attrs) {
    this.userName = undefined;

    attrs && _.extend(this,  attrs);
};

users.UserParam = function(attrs) {
    this.userId = undefined;
    this.userName = undefined;
    this.realName = undefined;
    this.title = undefined;
    this.email = undefined;
    this.mobile = undefined;
    this.tel = undefined;

    attrs && _.extend(this,  attrs);
};
