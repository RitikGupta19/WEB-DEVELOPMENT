const User = require("../models/user");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()[0].msg,
            params: errors.array()[0].param
        });
    }
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "NOT able to save user in DB"
            });
        }
        res.json({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            id: user._id
        });
    });
};

exports.signin = (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()[0].msg,
            params: errors.array()[0].param
        });
    }
    User.findOne({email} ,(err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "User Email dont exists."
            });
        }
       
        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and Password are incorrect."
            });
        }
        // Create Token
        const token = jwt.sign({_id: user._id}, process.env.SECRET);
        // Putting token to cookie
        res.cookie("token", token, {expire: new Date() + 9999});
        
        const { _id, username, email, role } = user;
        // Returning token to browser with user details to FRONT END
        return res.json({ token, user: { _id, username, email, role } });
    });
};

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "Signed out"
    });
};

// Protected Routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    // This property will be checked present 
    // or not in user's account
    userProperty: "auth"
});

// Custom Middlewares
exports.isAuthenticated = (req, res, next) => {
    // Profile is a frontEnd property set while signing in
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
      return res.status(403).json({
        error: "ACCESS DENIED"
      });
    }
    next();
  };

exports.isAdmin = (req, res, next) => {
    //console.log(req.profile);
    if (req.profile.role === 0) {
      return res.status(403).json({
        error: "You are not ADMIN, Access denied"
      });
    }
    next();
};