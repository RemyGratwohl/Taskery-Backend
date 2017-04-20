/**
 * Created by remyg on 12/9/2016.
 */
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var schema = new mongoose.Schema({
    _character: {type: mongoose.Schema.Types.ObjectId, ref: 'Character'},
    name: String,
    description: String,
    difficulty: Number,
    hasBeenCompleted: Boolean,
    expiryDate: Date,
    updatedAt: Date,
    createdAt: Date
});

schema.plugin(deepPopulate);

module.exports = mongoose.model('Quest', schema, 'Quest');