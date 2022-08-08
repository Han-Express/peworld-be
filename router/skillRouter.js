const express = require("express");
const skillController = require("../controller/skillController");
const verifyEmployee = require("../helper/verifyEmployee");
const router  = express.Router()

router.get("/:id", skillController.getSkill);
router.post("/", verifyEmployee, skillController.addSkill);
router.patch("/:id", verifyEmployee, skillController.updateSkill);
router.delete("/:id", verifyEmployee, skillController.removeSkill);

module.exports = router