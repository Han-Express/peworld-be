const express = require("express");
const portfolioController = require("../controller/portfolioController");
const { uploadPortfolio } = require("../helper/upload");
const router  = express.Router()

router.get("/:id", portfolioController.getPortfolio);
router.post("/", uploadPortfolio, portfolioController.addPortfolio);

module.exports = router