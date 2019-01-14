const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const auth = require('./routes/auth')(passport);

const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL || 'http://localhost:'

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({ secret: 'cat', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use('/', auth);

console.log(`Server started on ${baseUrl}${port}`);

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
mongoose.connect(config.mongoConnectionString);

module.exports = app;
