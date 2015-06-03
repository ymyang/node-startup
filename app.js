var morgan = require('morgan');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var logger = require('./util/logger.js').logger;

var url = require('url');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(morgan('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

app.disable('x-powered-by');

app.use(function (req, res, next) {
  var params = '';
  var str = req.headers['content-type'] || '';
  var mime = str.split(';')[0];
  if (req.body && mime === 'application/json') {
    params += "[body]: " + JSON.stringify(req.body);
  }
  //console.log('Express [uri]: ', req.url, ", ", params);
  logger.info('Express [uri]:', req.url, ",", params);
  next();
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found:' + req.url);
  err.status = 404;
  next(err);
});

// error handlers

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
