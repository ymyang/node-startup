/**
 * Created by yang on 2015/6/2.
 */
var winston = require("winston");
var config = require('../config.json');
var models = module.exports = {};

var customLevels = {
    levels: {
        trace: 0,
        debug: 1,
        info: 2,
        warn: 3,
        error: 4
    },
    colors: {
        trace: 'blue',
        debug: 'green',
        info: 'grey',
        warn: 'yellow',
        error: 'red'
    }
};

models.logger = new (winston.Logger)({
    levels: customLevels.levels,
    transports: [
        new (winston.transports.Console)({
            level: config.env === 'dev' ? 'trace' : 'error',
            colorize: true,
            handleExceptions: true
        })
    ],
    exitOnError: false
});
