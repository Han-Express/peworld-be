const express = require("express");
const app = express();
const usersRouter = require("./usersRouter.js");
const authRouter = require("./authRouter");
const companyRouter = require("./companyRouter");
const portfolioRouter = require("./portfolioRouter");
const skillRouter = require("./skillRouter");
const employeesRouter = require('./employeesRouter');
const experienceRouter = require ('./experienceRouter');
const alterRouter = require("./alterRouter")
const chatRouter = require('./chatRouter')

app.use('/chat', chatRouter);
app.use("/alter", alterRouter);
app.use("/companies", companyRouter);
app.use("/skill", skillRouter);
app.use("/portfolio", portfolioRouter);
app.use('/users', usersRouter);
app.use("/auth", authRouter);
app.use("/employees",employeesRouter);
app.use("/experience",experienceRouter);

module.exports = app