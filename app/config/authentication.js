var JWTStrategy = require('passport-jwt').Strategy;
var ExtractJWT = require('passport-jwt').ExtractJwt;
var User = require('../models/user');
var config = require('./config');

var options = {
    jwtFromRequest: ExtractJWT.fromAuthHeader(),
    secretOrKey: config.secret
}

module.exports = function(passport) {
    passport.use(new JWTStrategy(options,function(jwt_payload, done) {
        User.findOne({id: jwt_payload.sub}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};