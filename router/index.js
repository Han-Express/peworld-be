const express = require("express");
const app = express()
const usersRouter = require("./usersRouter.js")

app.use("/users", usersRouter)

module.exports = app