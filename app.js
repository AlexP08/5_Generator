const fs = require('fs')
let rdata = fs.readFileSync('var.json')
let consts = JSON.parse(rdata)

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var catalogRouter = require('./routes/catalog');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);
app.use('/catalog', catalogRouter);

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

module.exports = app;

// Импортируем модуль ongoose
var mongoose = require('mongoose');
// Установим подключение по умолчанию
var mongoDB = consts.mongo_url;
mongoose.connect(mongoDB);
// Позволим Mongoose использовать глобальную библиотеку промисов
mongoose.Promise = global.Promise;
// Получим подключения по умолчанию
var db = mongoose.connection;
// Привяжем подключение к событию ошибки (ошибки будут вывести в консоли) 
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
