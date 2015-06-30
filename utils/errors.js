/**
 * Created by yang on 2015/6/30.
 */
const TAG = '[err]';
var util = require('util');
var logger = require('./logger.js');
var BaseDTO = require('../dto/BaseDTO.js');

var errors = module.exports = {};

/**
 * 服务异常处理
 * @param err
 * @param res
 */
errors.handler = function(err, res) {
    var dto = new BaseDTO();
    if (err instanceof errors.ServiceError) {
        console.log(TAG, 'ServiceError');
        logger.info(TAG, err);
        dto.status = err.code;
        dto.msg = err.message;
        if (!isNaN(err.status)) {
            res.status(err.status);
        }
    } else {
        logger.error(TAG, err);
        res.status(500);
        dto.status = errors.codes.err_500;
        dto.msg = err.message;
    }
    res.json(dto);
};

/**
 * 服务异常
 * @param code
 * @param message
 * @param status
 * @constructor
 */
errors.ServiceError = function(code, message, status) {
    this.code = code;
    this.message = msg;
    this.status = status;

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    }
};

util.inherits(errors.ServiceError, Error);

/**
 * 异常编码
 * @type {{ok: string, err_500: string, err_reqdata: string, err_token: string}}
 */
errors.codes = {
    ok: 'ok',
    err_500: 'err_500',
    err_reqdata: 'err_reqdata',
    err_token: 'err_token'
};
