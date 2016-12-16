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
mongoose.connect(config.database);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
require('./app/config/authentication')(passport);

app.use('/user', users);

app.listen(3000, function () {
    console.log('App listening on port 3000!')
})