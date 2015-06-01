/**
 * Created by yang on 2015/6/1.
 */
var _ = require('lodash');
var users = module.exports = {};

users.SignParam = function(attrs) {
    this.userName = undefined;

    attrs && _.extend(this,  attrs);
};
