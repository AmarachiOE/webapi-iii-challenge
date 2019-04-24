// Packages
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
//const cors = require("cors"); yarn add first then server.use(cors());


// Routers 
const postsRouter = require("./data/posts-router");
const usersRouter = require("./data/users-router");

// Server
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
    res.send(`<h2>Welcome to Challenge III !</h2>`)
});

module.exports = server;
