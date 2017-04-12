/**
 * Created by Remy on 4/10/2017.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/create', passport.authenticate('jwt',
    {session: false}), function(req,res){

    console.log(req.body);

    if(!req.body){
        res.status(422)
            .json({
                name: 'MissingData',
                description: 'Request has no data'
            });
    }else{
        res.json({message: 'Success!'});
    }


});





module.exports = router;