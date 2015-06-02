/**
 * Created by yang on 2015/6/2.
 */
var winston = require("winston");

module.exports = function() {
    winston.handleExceptions();
    return new (winston.Logger)({
        levels: {
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
        },
        transports: [
            new (winston.transports.Console)({
                level: "debug",
                colorize: true,
                handleExceptions: true
            })
        ],
        exitOnError: false
    });

};
