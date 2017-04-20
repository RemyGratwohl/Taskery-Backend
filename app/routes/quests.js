/**
 * Created by Remy on 4/10/2017.
 */

var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var Quest = require('../models/quest');
var Character = require('../models/character');
var User = require('../models/user');

router.post('/create', passport.authenticate('jwt',
    {session: false}), function(req,res){

    if(!req.body){
        res.status(422)
            .json({
                name: 'MissingData',
                description: 'Request has no data'
            });
    }else{

        var quest = new Quest({
            _character: req.user.character._id,
            name: req.body.name,
            description: req.body.description,
            difficulty: req.body.difficulty,
            hasBeenCompleted: req.hasBeenCompleted,
            expiryDate: req.body.expiryDate,
            updatedAt: req.body.updatedAt,
            createdAt: req.body.createdAt
         });

        quest.save(function(err){
            if (err) {
                console.log(err.toString());
                return res.status(422)
                    .json({
                        name: 'QuestExists',
                        description: 'Somehow this quest already exists'
                    });
            }

            if(!quest.hasBeenCompleted){
                var updateObj = {$addToSet: {quests: quest._id}};
            }else{
                var updateObj = {$addToSet: {questsCompleted: quest._id}};
            }

            Character.findOneAndUpdate({_id: req.user.character._id}, updateObj).exec(function (err, user) {
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