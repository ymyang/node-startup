/**
 * Created by yang on 2015/6/27.
 */
var crypto = require('crypto');

var Encrypt = module.exports = {};

const SERVER_KEY = 'ZL823JDEPPYNX61WJPBZE5HLWZ0WGJL9';
const RANDOM_STR = '0123456789abcdefghijklmnopqrstuvwxyz';
const KEY_LENGTH = 12;
const USER_ID_LENGTH = 20;
const TIME_LENGTH = 11;
const TOKEN_LENGTH = 107;
const TOKEN_EXPIRE = 24 * 3600;
const ENCRYPT_KEY = 'yliyun123';

/**
 * 生成随机字符串
 * @param length
 * @returns {string}
 */
Encrypt.randomStr = function(length) {
    length = length || 32;
    var buffer = [];
    for (var i = 0; i < length; i++) {
        buffer[i] = RANDOM_STR.charAt(Math.floor(Math.random() * 36));
    }
    return buffer.join('');
}

/**
 * sha256
 * @param str
 * @returns {string}
 */
Encrypt.sha256 = function(str) {
    var hash = crypto.createHash('sha256');
    hash.update(str);
    return hash.digest('hex');
}

/**
 * 创建token
 * @param userId
 * @returns {string}
 */
Encrypt.createToken = function(userId) {
    var uid = insertLeftZero('' + userId, USER_ID_LENGTH).split('').reverse().join('');
    var seconds = getSeconds();
    var time = insertLeftZero('' + seconds, TIME_LENGTH);
    var key = Encrypt.randomStr(KEY_LENGTH);
    var sha = Encrypt.sha256(key + userId + SERVER_KEY + time);
    return key + sha + time + uid;
}

/**
 * 校验token
 * @param token
 * @returns {boolean}
 */
Encrypt.checkToken = function(token) {
    if (!token || token.length !== TOKEN_LENGTH) {
        return false;
    }
    var time = token.substring(KEY_LENGTH + 64, KEY_LENGTH + 64 + TIME_LENGTH);
    var tokenSeconds = cutLeftZero(time);
    var nowSeconds = getSeconds();
    if (tokenSeconds + TOKEN_EXPIRE < nowSeconds) {
        return false;
    }
    var key = token.substring(0, KEY_LENGTH);
    var sha = token.substring(KEY_LENGTH, KEY_LENGTH + 64);
    var userId = Encrypt.getUserId(token);
    var sha1 = Encrypt.sha256(key + userId + SERVER_KEY + time);
    return sha1 === sha;
}

/**
 * 根据token取用户id
 * @param token
 * @returns {Number}
 */
Encrypt.getUserId = function(token) {
    var uid = token.substring(KEY_LENGTH + 64 + TIME_LENGTH);
    return parseInt(cutLeftZero(uid.split('').reverse().join('')));
}

/**
 * 加密
 * @param str
 * @returns {string}
 */
Encrypt.encrypt = function(str) {
    console.log(crypto.getCiphers());
    var cipher = crypto.createCipher('aes256', ENCRYPT_KEY);
    cipher.update(str, 'utf8');
    return cipher.final('base64');
}

/**
 * 解密
 * @param str
 * @returns {string}
 */
Encrypt.decrypt = function(str) {
    var decipher = crypto.createDecipher('aes256', ENCRYPT_KEY);
    decipher.update(str, 'base64');
    return decipher.final('utf8');
}

/**
 * 二进制字符串转成16进制字符串
 * @param str
 * @returns {string}
 */
function byteToHexStr(str) {
    var r = '';
    for (var i = 0; i < str.length; i++) {
        r += str.charCodeAt(i).toString(16);
    }
    return r;
}

/**
 * 16进制字符串转成二进制字符串
 * @param str
 * @returns {string}
 */
function hexToByteStr(str) {
    var r = '';
    for (var i = 0; i < str.length; i += 2) {
        r += String.fromCharCode(parseInt(str.substring(i,  i + 2), 16));
    }
    return r;
}

/**
 * 取当前时间的秒数
 * @returns {string}
 */
function getSeconds() {
    var timestamp = '' + new Date().valueOf();
    return parseInt(timestamp.substring(0, timestamp.length - 3));
}

/**
 * 去除字符串左边的'0'
 * @param str
 * @returns {string}
 */
function cutLeftZero(str) {
    if (!str) {
        return str;
    }
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) !== '0') {
            return str.substring(i);
        }
    }
    return str;
}

/**
 * 在字符串左边填充'0'
 * @param str
 * @param length
 * @returns {string}
 */
function insertLeftZero(str, length) {
    if (str && str.length < length) {
        var count = length - str.length;
        var buffer = str.split('');
        for (var i = 0; i < count; i++) {
            buffer.unshift('0');
        }
        return buffer.join('');
    }
    return str;
}
