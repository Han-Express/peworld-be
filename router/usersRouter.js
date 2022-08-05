const express = require("express")
const router = express.Router()
const usersController = require("../controller/usersController.js")



router.get("/", usersController.getAllUser)


module.exports = router;