const express = require("express");
const skillController = require("../controller/skillController");
const router  = express.Router()

router.get("/:id", skillController.getSkill);
router.post("/", skillController.addSkill);
router.patch("/:id", skillController.updateSkill);
router.delete("/:id", skillController.removeSkill);

module.exports = router