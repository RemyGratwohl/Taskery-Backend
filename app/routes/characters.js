/**
 * Created by remyg on 12/9/2016.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jwt-simple');
var Character = require('../models/character');

router.get('/', passport.authenticate('jwt', {
    session: false
}), function(req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.');
});

router.get('/create', passport.authenticate('jwt', {
    session: false
}), function(req, res) {

    var character = new Character({
        email: req.body.email,
    })

    res.send('It worked! User id is: ' + req.user._id + '.');
});

module.exports = router;