import express from "express";
import Post from "../models/PostSchema.js";
const PostRoute = express.Router();

/* UPDATE USER */

PostRoute.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savePost = await newPost.save();
    res.status(500).json(savePost);
  } catch (error) {
    res.status(500).json(error);
  }
});

/* UPDATE USER */

PostRoute.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {}
    } else {
      res.status(401).json("your can Update only Your Post");
    }
  } catch (error) {
    res.send(500).json(error);
  }
});

/* DELETE USER */

PostRoute.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("post has been deleted . s");
      } catch (error) {}
    } else {
      res.status(401).json("your can Update only Your Post");
    }
  } catch (error) {
    res.send(500).json(error);
  }
});

/* GET USER */

PostRoute.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

/* GET ALL POST USER */

PostRoute.get("/", async (req, res) => {
    console.log("hello word");
  const username = req.query.user;
  const catName = req.query.cat;
  try {
      let posts ;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default PostRoute;
