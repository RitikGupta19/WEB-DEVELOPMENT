const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/Users");
const Profile = require("../../models/Profile");
const Posts = require("../../models/Posts");

// POST REQUEST -> CREATING POST
router.post(
  "/",
  [auth, [check("text", "Text is Required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      return res.json(post);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// GET ALL POSTS
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Posts.find().sort({ date: -1 });
    if (!posts) {
      return res.status(400).json({ msg: "NO Posts found" });
    }
    return res.json(posts);
  } catch (err) {
    console.log(err.message);
    return res.status(400).send("Server Error");
  }
});

// GET A POST
router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Posts.findById({ _id: req.params.post_id });
    if (!post) {
      return res.status(400).json({ msg: "NO Posts found" });
    }
    return res.json(post);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ err: "No posts found" });
    }
    console.log(err.message);
    return res.status(400).send("Server Error");
  }
});

// DELETE POST BY ID
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Posts.findById({ _id: req.params.post_id });
    if (!post) {
      return res.status(400).json({ err: "Post Id not valid" });
    }
    if (req.user.id !== post.user.toString()) {
      return res
        .status(401)
        .json({ msg: "Not Authorized to Delete this post." });
    }
    await post.remove();
    return res.json({ msg: "Post Removed" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
});

// LIKE A POST
router.put("/like/:post_id", auth, async (req, res) => {
  try {
    const post = await Posts.findById({ _id: req.params.post_id });

    // check posts already liked or not
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Already Liked this post" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    return res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
});

// UNLIKE A POST
router.put("/unlike/:post_id", auth, async (req, res) => {
  try {
    const post = await Posts.findById({ _id: req.params.post_id });

    // check posts already liked or not
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet liked" });
    }
    // get particular like in post
    const removeIndex = post.likes.map((like, index) => {
      if (like.user.toString() === req.user.id) return index;
    });

    post.likes.splice(removeIndex, 1);
    await post.save();
    return res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
});

// POST REQUEST -> CREATING COMMENT
router.post(
  "/comment/:post_id",
  [auth, [check("text", "Text is Required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      const post = await Posts.findById({ _id: req.params.post_id });
      post.comments.unshift(newComment);
      await post.save();
      return res.json(post.comments);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// DELETE COMMENT BY ID
router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Posts.findById({ _id: req.params.post_id });
    if (!post) {
      return res.status(400).json({ err: "Post Id not valid" });
    }

    // Pull out comment from post
    const comment = await post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(400).json({ msg: "Comment does not exists" });
    }
    if (comment.user.toString() !== req.user.id) {
      return res
        .status(400)
        .json({ msg: "You are not allowed to delete this comment" });
    }
    const removeIndex = post.comments.map((comment, index) => {
      if (comment.id === req.params.comment_id) return index;
    });

    post.comments.splice(removeIndex, 1);
    await post.save();
    return res.json(post.comments);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
