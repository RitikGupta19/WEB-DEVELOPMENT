const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { signout, signup, signin , isSignedIn}  = require('../controllers/auth');

router.post("/signup", [
    check("name", "name should be atleast 3 characters").isLength({ min:3 }),
    check("lastname", "name should be atleast 3 characters").isLength({ min:3 }),
    check("email", "email must be valid").isEmail(),
    check("password", "password must be atleast 3 charaters").isLength({ min:3 })
], signup);

router.post('/signin', [
    check("email", "email is required").isLength({min: 5}),
    check("password", "password is required").isLength({ min: 1 })
], signin);

router.get("/signout", signout);

module.exports = router;

