/**
 * Created by remyg on 12/9/2016.
 */
var mongoose = require('mongoose');
var User = require('./user');

var schema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref :'User'}
});

module.exports = mongoose.model('ToDo', schema);