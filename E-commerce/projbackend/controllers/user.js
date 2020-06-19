var User = require('../models/user');
var Order = require('../models/order');
const e = require('express');

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User was not found in DB"
            });
        } 
        req.profile = user;
        next();
    });
};

exports.getSpecificUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User was not found in DB"
            });
        } 
        req.specificProfile = user;
        next();
    });
};



exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if(err) {
                return res.status(400).json({
                error: "Can not update user!"
            })
        }
        user.salt = undefined;
        user.encry_password = undefined;
        res.json(user);
        }
    );
};

exports.getPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
        if (err) {
            return res.status(400).json({
                error: "No order present in this account"
            })
        }
        return res.json(order)
    })
};

exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [];
    req.body.order.products.forEach(product => {
        product.quantity = 1;
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        });
    });
    // Storing in DB
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { purchases: purchases } },
        { new: true },
        (err, purchases) => {
            if (err) {
                return res.status(400).json({
                    error: "Unable to save purchase list"
                })
            }
            next();
        }
    );
};

exports.getAllUsers = (req, res) => {
    User.find({}).exec((err, users)=> {
        if (err) {
            return res.status(400).json({
                error: "No users found in DB"
            });
        }
        else {
            return res.json(users);
        }
    });
};

exports.deleteUser = (req, res) => {
    User.findByIdAndRemove({_id: req.specificProfile._id})
    .exec((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "User failed to delete"
            });
        }
        else {
            return res.json(user);
        }
    })
};


exports.updateUserRole = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.specificProfile._id},
        { $set: req.body },
        { new: true}, (err, user) => {
            if(err) {
                return res.status(400).json({
                    error: "Failed to update role"
                });
            }
            else {
                return res.json(user);
            }
        })
};