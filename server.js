/**
 * Created by remyg on 12/6/2016.
 */

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
var passport = require('passport');

var config = require('./app/config/config');

var users = require('./app/routes/users');

var app =  express();

// Connect to the database
mongoose.Promise = global.Promise;

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

mongoose.connect(config.database,options);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
require('./app/config/authentication')(passport);

app.use('/user', users);

var port = process.env.PORT || 3000;

app.listen( port, function () {
    console.log('App listening on port 3000!')
})