const express = require('express');
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { 
    getUserById, 
    getSpecificUserById,
    getUser, 
    updateUser, 
    getPurchaseList, 
    getAllUsers,
    deleteUser,
    updateUserRole
    } = require('../controllers/user');

router.param("userId", getUserById);

router.param("updateUserId", getSpecificUserById);

//to use
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
//to use
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
//to use
router.get("/orders/user/:userId", isSignedIn, isAuthenticated, getPurchaseList);

router.get("/admin/all/users/:userId", isSignedIn, isAuthenticated, isAdmin, getAllUsers);

router.delete("/admin/delete/:userId/:updateUserId", isSignedIn, isAuthenticated, isAdmin, deleteUser);

router.put("/admin/update/:userId/:updateUserId", isSignedIn, isAuthenticated, isAdmin, updateUserRole);

module.exports = router;
