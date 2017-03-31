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

router.post('/register', function(req,res){
    if(!req.body.email || !req.body.password){
        // Send
        res.status(422)
            .json({
                name: 'MissingData',
                description: 'Missing Email or Password'
            });
    }else{
        var user = new User({
            email: req.body.email,
            password: req.body.password
        });

        user.save(function(err){
            if(err){
                return res.status(422)
                    .json({
                        name: 'EmailExists',
                        description: 'An Account With That Email Already Exists'
                    });
            }

            console.log('User ' + user.email + ' successfully created');
            res.json({
                message: 'User created successfully'
            });
        });
    }
});

// user/login
router.post('/login', function(req,res){
    User.findOne({
        email: req.body.email
    }, function(err, user){
        if (err) throw err;

        if (!user){
            res.status(422)
                .json({
                    name: 'MissingUser',
                    description: 'The user was not found'
                });
        } else {
            // Check password
            user.comparePassword(req.body.password, function(err,isTheSame) {
                if (!err && isTheSame){
                    var jwtToken = jwt.encode(user,config.secret);
                    res.json({
                        email: user.email,
                        jwtToken: jwtToken,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt
                    });
                } else {
                    res.status(422)
                        .json({
                            name: 'WrongPassword',
                            description: 'The Password was Incorrect'
                        });
                }
            });
        }
    });
});

router.use('/character',characterRouter);

module.exports = router;