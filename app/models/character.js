/**
 * Created by remyg on 12/9/2016.
 */

var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var schema = new mongoose.Schema({
   _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true},
   name: String,
   class_id: Number,
   quests: [{type: mongoose.Schema.Types.ObjectId, ref: 'Quest'}],
   questsCompleted: [{type: mongoose.Schema.Types.ObjectId, ref: 'Quest'}],
   numGold: Number,
   currentHP: Number,
   maxHP: Number,
   xp: Number,
   lastLogin: Date,
   updatedAt: Date,
   createdAt: Date
});

schema.plugin(deepPopulate);


module.exports = mongoose.model('Character', schema);