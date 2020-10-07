const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("config");
const User = require("../../models/Users");
const Profile = require("../../models/Profile");
const auth = require("../../middlewares/auth");
const { check, validationResult } = require("express-validator");

// GET USER PROFILE
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "gravatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no Profile for this User" });
    }
    return res.json(profile);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
});

// To create the user profile
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is Required").not().isEmpty(),
      check("skills", "Skills is Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      githubusername,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    } = req.body;

    // BUILD PROFILE OBJECT
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (location) profileFields.location = location;
    if (website) profileFields.website = website;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }
    // BUILD SOCIAL LINKS
    profileFields.social = {};
    if (youtube) profileFields.youtube = youtube;
    if (twitter) profileFields.twitter = twitter;
    if (instagram) profileFields.instagram = instagram;
    if (linkedin) profileFields.linkedin = linkedin;
    if (facebook) profileFields.facebook = facebook;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      // UPPDATE PROFILE
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      // CREATE NEW PROFILE
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.log(err.message);
      return res.status(400).send("Server Error");
    }
  }
);

// GET ALL PROFILES ROUTE
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.find().populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "NO profiles exists." });
    }
    return res.json(profile);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
});

// GET A PROFILE ROUTE
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "NO profile exists." });
    }
    return res.json(profile);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "NO profile exists." });
    }
    return res.status(500).send("Server Error");
  }
});

// DELETE A SINGLE PROFILE AND ITS POSTS AND USER
router.delete("/", auth, async (req, res) => {
  try {
    //Remove user posts

    // Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });

    return res.json({ msg: "User Deleted" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
});

// Updating the Experience IN PROFILE
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is Requires").not().isEmpty(),
      check("company", "Company is Required").not().isEmpty(),
      check("from", "from is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// DELETE A PARTICULAR EXPERIENCE
router.delete("/experience/:experience_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.experience.map((exp, index) => {
      if (exp.id === req.params.experience_id) return index;
    });

    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
});

// Updating the Education IN PROFILE
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is Requires").not().isEmpty(),
      check("degree", "Degree is Required").not().isEmpty(),
      check("fieldofstudy", "Field of study is Required").not().isEmpty(),
      check("from", "from is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// DELETE A PARTICULAR EDUCATION
router.delete("/education/:education_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.education.map((edu, index) => {
      if (edu.id === req.params.education_id) return index;
    });

    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
});

// GET GITHUB REPO FOR A USER
router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubClientSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) {
        console.error(error);
      }
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "Page Not found" });
      }
      return res.json(JSON.parse(body));
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).send("Server Error");
  }
});

module.exports = router;
