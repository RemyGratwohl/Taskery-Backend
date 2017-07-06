/**
 * Created by remyg on 12/9/2016.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jwt-simple');
var Character = require('../models/character');
var User = require('../models/user');
var questRouter = require('./quests');

router.get('/', passport.authenticate('jwt', {
    session: false
}), function(req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.');
});

// TODD HOWARD IT JUST WORKS
router.post('/create', passport.authenticate('jwt', {
    session: false
}), function(req, res) {

    console.log(req.body);

    if(!req.body){
        res.status(422)
            .json({
                name: 'MissingData',
                description: 'Request has no data'
            });
    }else{
        var char = new Character({
            _user: req.user._id,
            name: req.body.name,
            currentHP: req.body.currentHP,
            maxHP: req.body.maxHP,
            class_id: req.body.char_class_id,
            xp: req.body.xp,
            numGold: req.body.numGold,
            updatedAt: req.body.updatedAt,
            createdAt: req.body.createdAt

        });

        char.save(function(err) {
            if (err) {
                console.log(err.toString());
                return res.status(422)
                    .json({
                        name: 'CharacterExists',
                        description: 'This account already has a character made'
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

router.post('/update', passport.authenticate('jwt', {session: false}), function(req,res){

    if(!req.body){
        res.status(422)
            .json({
                name: 'MissingData',
                description: 'Request has no data'
            });
    }else{
        Character.findOneAndUpate({_user: req.user._id},
            {$set:
                {
                    numGold: req.body.numGold,
                    xp: req.body.xp,
                    maxHp: req.body.maxHP,
                    currentHP: req.body.currentHP
                }
            }).exec(function (err, user) {
                if(err){
                    console.log(err);
                    // respond with error
                    res.response{message: err}
                }else{
                    res.json({message: 'Success!'});
                }
        });
    }
});

router.use('/quests',questRouter);

module.exports = router;