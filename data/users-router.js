const express = require("express");
const users = require("./helpers/userDb");

const usersRouter = express.Router();

/* POST AND PUT needs MIDDLEWARE

Write custom middleware to ensure that the user's name is upper-cased before the request reaches the POST or PUT route handlers.

*/
// url begins with /api/users

// CUSTOM MIDDLEWARE ============
function allCaps(req, res, next) {
  const name = req.body.name; // instead of req.headers.name
  if (name == name.toUpperCase()) {
    next();
  } else {
    res.status(401).send("Your name is not in uppercase!");
  }
}
// middleware is not returning anything here so doesn't need to be invoked in the post and put api request, only stated

// GET ALL USERS =================
usersRouter.get("/", (req, res) => {
  users
    .get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

// GET USER BY ID =================
usersRouter.get("/:id", (req, res) => {
  const userId = req.params.id;
  users
    .getById(userId)
    .then(user => {
      if (user.length == 0 || user === undefined) {
        res
          .status(404)
          .json({ error: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user's information could not be retrieved." });
    });
});

// GET USER POSTS =================
usersRouter.get("/:id/posts", (req, res) => {
  const userId = req.params.id;
  users
    .getUserPosts(userId)
    .then(user => {
      if (user.length == 0 || user == undefined || !user) {
        res
          .status(404)
          .json({ error: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "This user's posts could not be retrieved." });
    });
});

// POST =================
usersRouter.post("/", allCaps, (req, res) => {
  const userInfo = req.body;
  if (!userInfo || !userInfo.name) {
    res
      .status(400)
      .json({ error: "Please provide a user and/or name of the user." });
  } else {
    users
      .insert(userInfo)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        });
      });
  }
});

// DELETE =================
usersRouter.delete("/:id", (req, res) => {
  const userId = req.params.id;
  users
    .remove(userId)
    .then(user => {
      if (user) {
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

module.exports = usersRouter;
