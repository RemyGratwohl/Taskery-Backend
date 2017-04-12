/**
 * Created by remyg on 12/9/2016.
 */
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    _character: {type: mongoose.Schema.Types.ObjectId, ref: 'Character'},
    name: String,
    description: String
});

module.exports = mongoose.model('Quest', schema);