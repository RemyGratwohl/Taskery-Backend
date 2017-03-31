/**
 * Created by remyg on 12/6/2016.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var ToDo = require('./todo');

var schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    character: {type: mongoose.Schema.Types.ObjectId, ref: 'Character'},
    todos: [{type: mongoose.Schema.Types.ObjectId, ref: 'ToDo'}]
    },{ timestamps: true
});

schema.pre('save', function (next) {
    var user = this;

    if (this.isModified('password') || this.isNew){
        bcrypt.genSalt(10, function(err, salt){
            if(err){
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

schema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', schema);

