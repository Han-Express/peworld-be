const express = require("express");
const companyController = require("../controller/companyController");
const { uploadProfile } = require("../helper/upload");
const router  = express.Router()

router.get("/:id", companyController.getCompanyId);
router.patch("/:id", uploadProfile , companyController.updateCompany);

module.exports = router