const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const auth = require('./routes/auth')(passport);
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Connect to MongoDB
mongoose.connect(config.mongoConnectionString, { useNewUrlParser: true });

let app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// For body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

 // persistent login sessions
app.use(session({ secret: 'ae2b1fca515949e5d54fb22b8ed95575', resave: false, saveUninitialized: true, store: new RedisStore({ host: config.redis.host, port: config.redis.port, pass: config.redis.auth }) }));
app.use(passport.initialize());
app.use(passport.session());

// All our custom routes
app.use('/', auth);

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
