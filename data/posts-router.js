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

postsRouter.post("/", (req, res) => {
    const newPost = req.body;
    console.log("Request Body: ", newPost);
    if (!newPost.text) {
      res
        .status(400)
        .json({ error: "Please provide text for the post." });
    } else {
      posts
        .insert(newPost)
        .then(post => {
          res.status(201).json(post);
        })
        .catch(err => {
          res.status(500).json({
            error: "There was an error while saving the post to the database."
          });
        });
    }
  });



/*
postsRouter.post("/", (req, res) => {
  const newPost = req.body;
  const userId = req.params.id;
  console.log("Request Body: ", newPost);
  posts
    .getById(userId)
    .then(user => {
      if (!user) {
        res.status(404).json({ error: "User doesn't exists." });
      } else {
        if (!newPost.text) {
          res.status(400).json({ error: "Please provide text for the post." });
        } else {
          posts
            .insert(newPost)
            .then(post => {
              res.status(201).json(post);
            })
            .catch(err => {
              res.status(500).json({
                error:
                  "There was an error while saving the post to the database."
              });
            });
        }
      }
    })
    .catch(err => {
      res.status(400).json({ error: "Please provide text for the post." });
    });
});
*/

/*
 
 // ========== ORIGINAL ==============

 postsRouter.post("/", (req, res) => {
    const newPost = req.body;
    const newPostId = req.params.id;
    console.log("Request Body: ", newPost);
    if (!newPost.text) {
      res
        .status(400)
        .json({ error: "Please provide text for the post." });
    } else {
      posts
        .insert(newPost)
        .then(post => {
          res.status(201).json(post);
        })
        .catch(err => {
          res.status(500).json({
            error: "There was an error while saving the post to the database."
          });
        });
    }
  });
 
 
  // ===== TESTING NEW METHOD ======

  postsRouter.post("/", (req, res) => {
    const newPost = req.body;
    const newPostId = req.params.id;
    console.log("Request Body: ", newPost);
    if (!newPost.text) {
      res
        .status(400)
        .json({ error: "Please provide text for the post." });
    } else {
      posts
        .insert(newPost)
        .then(post => {
            posts.getById(newPostId);
          res.status(201).json(post);
        })
        .catch(err => {
          res.status(500).json({
            error: "There was an error while saving the post to the database."
          });
        });
    }
  });
 
 */
 
 

// DELETE =================
postsRouter.delete("/:id", (req, res) => {
    const postId = req.params.id;
    posts
      .remove(postId)
      .then(post => {
        if (post) {
          res.status(204).end();
        } else {
          res
            .status(404)
            .json({ error: "The post with the specified ID does not exist." });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: "The post could not be removed"
        });
      });
  });


// PUT =================
postsRouter.put("/:id", (req, res) => {
    const postId = req.params.id;
    const postInfo = req.body;
    if (!postInfo.text) {
      res
        .status(400)
        .json({ error: "Please provide text for the post." });
    } else {
      posts
        .update(postId, postInfo)
        .then(post => {
          if (post) {
            res.status(200).json(post);
          } else {
            res
              .status(404)
              .json({ error: "The post with the specified ID does not exist." });
          }
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: "The post information could not be modified." });
        });
    }
  });

module.exports = postsRouter;
