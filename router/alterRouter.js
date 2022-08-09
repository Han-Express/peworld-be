const express = require("express");
const alterController = require("../controller/alterController");
const router  = express.Router()

router.post("/setnull",  alterController.setNull);


module.exports = router