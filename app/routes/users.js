/**
 * Created by remyg on 12/6/2016.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jwt-simple');
var User = require('../models/user');
var config = require('../config/config');
var characterRouter = require('./characters');

router.post('/signup', function(req,res){
    if(!req.body.email || !req.body.password){
        // Send
        res.json({
            success: 'false',
            message: 'Missing Email or Password'
        });
    }else{
        var user = new User({
            email: req.body.email,
            password: req.body.password
        });

        user.save(function(err){
            if(err){
                return res.json({
                    success: 'false',
                    message: 'Email address already exists'
                });
            }

            res.json({
                success: true,
                message: 'User created successfully'
            });
        });
    }
});

router.post('/login', function(req,res){
    User.findOne({
        email: req.body.email
    }, function(err, user){
        if (err) throw err;

        if (!user){
            res.status(400)
                .json({
                    success: false,
                    message: 'User not found'
                });
        } else {
            // Check password
            user.comparePassword(req.body.password, function(err,isTheSame) {
                if (!err && isTheSame){
                    var jwtToken = jwt.encode(user,config.secret);
                    res.json({
                        success: true,
                        email: user.email,
                        message: 'Authentication successful',
                        jwtToken: jwtToken,
                        character: user.character
                    });
                } else {
                    res.status(400)
                        .json({
                            success: false,
                            message: 'Incorrect Password'
                        });
                }
            });
        }
    });
});

router.use('/character',characterRouter);

module.exports = router;