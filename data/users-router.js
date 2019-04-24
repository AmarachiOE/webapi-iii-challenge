const express = require("express");
const users = require("./helpers/userDb");

const usersRouter = express.Router();

/* POST AND PUT needs MIDDLEWARE

Write custom middleware to ensure that the user's name is upper-cased before the request reaches the POST or PUT route handlers.

*/
// url begins with /api/users

// GET ALL USERS =================
// GET USER BY ID =================
// GET USER POSTS =================
// POST =================
// DELETE =================
// PUT =================


module.exports = usersRouter;