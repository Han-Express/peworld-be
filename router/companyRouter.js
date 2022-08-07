const express = require("express");
const companyController = require("../controller/companyController");
const { uploadProfile } = require("../helper/upload");
const verifyCompany = require("../helper/verifyCompany");
const router  = express.Router()

router.get("/:id", companyController.getCompanyId);
router.patch("/:id",  uploadProfile , verifyCompany, companyController.updateCompany);

module.exports = router