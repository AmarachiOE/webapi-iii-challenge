const express = require("express");
const posts = require("./helpers/postDb.js");

const postsRouter = express.Router();

// url begins with /api/posts

// GET ALL POSTS =================
postsRouter.get("/", (req, res) => {
    posts
      .get()
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The posts information could not be retrieved." });
      });
  });
  
// GET POST BY ID =================
postsRouter.get("/:id", (req, res) => {
    const postId = req.params.id;
    posts
      .getById(postId)
      .then(post => {
        if (post.length == 0 || post === undefined) {
          res
            .status(404)
            .json({ error: "The post with the specified ID does not exist." });
        } else {
          res.status(200).json(post);
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The post information could not be retrieved." });
      });
  });
// POST =================
// DELETE =================
// PUT =================


module.exports = postsRouter;