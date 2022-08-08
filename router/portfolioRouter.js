const express = require("express");
const portfolioController = require("../controller/portfolioController");
const { uploadPortfolio } = require("../helper/upload");
const verifyEmployee = require("../helper/verifyEmployee");
const router  = express.Router()

router.get("/:id", portfolioController.getPortfolio);
router.post("/",  uploadPortfolio, verifyEmployee, portfolioController.addPortfolio);
router.delete("/:id", verifyEmployee, portfolioController.removePortfolio);

module.exports = router