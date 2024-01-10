var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var {socketServer} = require('./socket-server.js');
const { createServer } = require("http");
const { Server } = require("socket.io");



var usersRouter = require('./routes/users');

var app = express();
const httpServer = createServer(app);
const io=new Server(httpServer, { cors: {
        origin: "*", // Adjust accordingly for production
        methods: ["GET", "POST"]
      } });
const indexRouter = require('./routes/index');
const socketApi = require('./routes/socketApi')(io);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules', 'socket.io', 'client-dist')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', socketApi);

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


socketServer(io,httpServer);

module.exports = {app,io};
