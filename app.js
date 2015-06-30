/**
 * Created by yang on 2015/6/22.
 */
const TAG = '[app]';
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config.json');
var logger = require('./utils/logger.js');

var routes = require('./routes');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.disable('x-powered-by');

// routes
app.use('/', routes);

var port = config.port || 3000;
app.set('port', port);
var server = http.createServer(app);
server.listen(port);

server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(TAG, bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(TAG, bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    logger.info(TAG, 'Listening on ', bind);
}


process.on("uncaughtException", function (err) {
    logger.error(TAG, 'uncaughtException:', err);
});
process.on("unhandledRejection", function(reason, promise) {
    logger.error(TAG, 'unhandledRejection:', reason, promise);
});
process.on("rejectionHandled", function(promise) {
    logger.error(TAG, 'rejectionHandled:', promise);
});
