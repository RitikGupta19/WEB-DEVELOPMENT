const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const User = require("../../models/Users");
const { check, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const config = require("config");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: "Server Error" });
  }
});

router.post(
  "/",
  [
    check("email", "Enter a Valid Email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // SEE IF USER ALREADY EXISTS OR NOT
      let user = await User.findOne({ email }); // {email: email}
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

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
