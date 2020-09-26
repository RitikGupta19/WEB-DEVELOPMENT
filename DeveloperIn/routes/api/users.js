const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/Users");
const config = require("config");
var gravatar = require("gravatar");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// Register User
router.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "Enter a Valid Email").isEmail(),
    check(
      "password",
      "Please enter a password more than 6 characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // SEE IF USER ALREADY EXISTS OR NOT
      let user = await User.findOne({ email }); // {email: email}
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User Already Exists" }] });
      }

      // GET USERS GRAVATAR
      const avatar = gravatar.url(email, {
        s: "200",
        d: "mm",
        r: "pg",
      });

      user = new User({
        name,
        email,
        password,
        avatar,
      });

      // ENCRYPT PASSWORD
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // RETURN JWT
      const payload = {
        user: {
          id: user.id,
        },
      };

      var token = jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      // Here only server error will arrive
      return res.status(500).send("Server error");
    }
  }
);

module.exports = router;
