const express = require("express");
const users = require("./helpers/userDb");

const usersRouter = express.Router();

/* POST AND PUT needs MIDDLEWARE

Write custom middleware to ensure that the user's name is upper-cased before the request reaches the POST or PUT route handlers.

*/
// url begins with /api/users

// GET ALL USERS =================
usersRouter.get("/", (req, res) => {
    users.get()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The users information could not be retrieved." });
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
            .json({ error: "The post with the specified ID does not exist." });
        } else {
          res.status(200).json(user);
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The post information could not be retrieved." });
      });
  });
// GET USER POSTS =================
// POST =================
// DELETE =================
// PUT =================


module.exports = usersRouter;