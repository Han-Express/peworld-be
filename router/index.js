const express = require("express");
const app = express()
const usersRouter = require("./usersRouter.js")
const employeesRouter = require('./employeesRouter')
const experienceRouter = require ('./experienceRouter')

app.use('/users', usersRouter)
app.use("/employees",employeesRouter)
app.use("/experience",experienceRouter)

module.exports = app