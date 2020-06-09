var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
var FacebookTokenStrategy = require('passport-facebook-token');

var config = require('./config');

// Local Strategy implementation
exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey, 
        { expiresIn: 3600});
};

// Options tell how the token will be extracted
var opts = {};
// Way of extracting token
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// For verifying token's signature
opts.secretOrKey = config.secretKey;  

// Will authenticate if user present or not
exports.jwtPassword = passport.use(new JwtStrategy( opts,
    (jwt_payload, done) => {
        console.log("JWT PAYLOAD: ",jwt_payload);
        User.findOne({ _id: jwt_payload._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if(user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }
));

// Assigning middleware to verifyUser
exports.verifyUser = passport.authenticate('jwt', { session: false });

exports.verifyAdmin = (req, res, next) => {
    if (!req.user.admin == true) {
        res.status(403).json({
            error: "You are not authorized to perform this operation!"
        });
        next(error);
        return ;
    }
    next();
};

exports.facebookPassport = passport.use(new FacebookTokenStrategy({
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret
    },
    // Verify Callback starts here
    // profile consists of facebook authenticated profile
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ facebookId: profile.id }, (err, user) => {
            if(err) {
                return done(err, false);
            }
            if (!err && user !== null) {
                return done(null, user);
            }
            user = new User({ username: profile.displayName });
            user.facebookId = profile.id;
            user.firstname = profile.name.givenName;
            user.lastname = profile.name.familyName;
            user.save((err, user) => {
                if (err) {
                    return done(err, false);
                }
                else {
                    return done(null, user);
                }
            });
        });
    }
));