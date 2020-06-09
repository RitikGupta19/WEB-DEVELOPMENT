var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Will add UserId and Password to DB
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    facebookId: String,
    admin: {
        type: Boolean,
        default: false
    }
});

// Adds the username and id(hashed format) to DB
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);