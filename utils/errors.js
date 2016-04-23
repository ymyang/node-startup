/**
 * Created by yang on 2015/6/30.
 */
const TAG = '[err]';
var util = require('util');
var logger = require('./logger.js');
var BaseDTO = require('../dto').BaseDTO;

var errors = module.exports = {};

/**
 * 服务异常处理
 */
errors.handler = function(err, res) {
    var dto = new BaseDTO();
    if (err instanceof errors.ServiceError) {
        logger.info(TAG, err);
        dto.status = err.errorCode;
        dto.msg = err.message;
        if (!isNaN(err.status)) {
            res.status(err.status);
        }
    } else {
        logger.error(TAG, err);
        dto.status = errors.codes.err_500;
        dto.msg = err.message;
        res.status(500);
    }
    res.json(dto);
};

errors.throwErr = function(errCode, errMsg) {
    var err = new errors.ServiceError(errCode);
    err.message = errMsg;
    throw err;
};

/**
 * 服务异常
 */
errors.ServiceError = function(errorCode, message, status) {
    // 异常编码
    this.errorCode = errorCode;
    // 异常解释信息
    this.message = message;
    // response 状态
    this.status = status;

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    }
};

// ServiceError继承Error
util.inherits(errors.ServiceError, Error);

/**
 * 异常编码
 */
errors.codes = {
    ok: 'ok',
    err_500: 'err_500',
    err_reqdata: 'err_reqdata',
    err_token: 'err_token'
};
