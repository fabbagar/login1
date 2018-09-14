var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var fs = require('fs');
var url = require('url');
var bodyParser = require('body-parser');

require('./passport/passport')(passport);

var indexRouter = require('./routes/routes');


var app = express();

app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );

var util = require('util');

var assert = require('assert');

let port = process.env.PORT || 8080;

let cfenv = require('cfenv');

try{
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP");
}catch (e){
    // console.log(e)
}

const appEnvOpts = vcapLocal ? {vcap: vcapLocal} : {}
const appEnv = cfenv.getAppEnv(appEnvOpts);

let services = appEnv.services;


app.use(cookieParser());
app.use(session({
  secret : '@Nuncarendirsejamas02', //node.js crea una clave secreta
  resave : false,
  saveUninitialized : false
}));
app.use(flash());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, function(){
    console.log("Server is listening on port " + port);
}):

module.exports = app;
