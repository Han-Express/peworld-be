const express = require("express");
const app = express();
const usersRouter = require("./usersRouter.js");
const authRouter = require("./authRouter");
const companyRouter = require("./companyRouter");
const portfolioRouter = require("./portfolioRouter");
const skillRouter = require("./skillRouter")

app.use("/companies", companyRouter);
app.use("/skill", skillRouter)
app.use("/portfolio", portfolioRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

module.exports = app