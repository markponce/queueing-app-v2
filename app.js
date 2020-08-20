require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const servicesRouter = require('./routes/services');
const queuesRouter = require('./routes/queues');
const userSession = require('./routes/sessions');
const mongoose = require('./db');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

// var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
  name: 'sessId',
  resave: false,
  saveUninitialized: false,
  secret: 'foo',
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: {
    // secure: true,
    // httpOnly: true,
    // domain: 'example.com',
    // path: 'foo/bar',
    // expires: expiryDate
  }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/services', servicesRouter);
app.use('/queues', queuesRouter);

app.use('/userSession', userSession)

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = app;
