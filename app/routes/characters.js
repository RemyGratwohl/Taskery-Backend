/**
 * Created by remyg on 12/9/2016.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jwt-simple');
var Character = require('../models/character');
var User = require('../models/user');

router.get('/', passport.authenticate('jwt', {
    session: false
}), function(req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.');
});

// TODD HOWARD IT JUST WORKS
router.post('/create', passport.authenticate('jwt', {
    session: false
}), function(req, res) {

    console.log(req.user.email)
    console.log(req.body);

    if(!req.body){
        // EMPTY REQUEST
    }else{
        var char = new Character({
            _user: req.user._id,
            name: req.body.name,
            currentHP: req.body.currentHP,
            maxHP: req.body.maxHP,
            class_id: req.body.char_class_id,
            xp: req.body.xp,
            numGold: req.body.numGold
        });

        char.save(function(err) {
            if (err) {
                console.log(err.toString());
                return res.status(422)
                    .json({
                        name: 'CharacterExists',
                        description: 'An Character already exists on this account'
                    });
            }

            User.findOneAndUpdate({email: req.user.email}, {$set: {character: char._id}}).exec(function (err, user) {
                if(err){
                    console.log(err);
                }else{
                    console.log(user);
                }
            });

            res.json({message: 'Success!'});
        });
    }
 });

module.exports = router;