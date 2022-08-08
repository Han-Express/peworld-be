const express = require("express")
const router = express.Router()
const {getAllExperience,getExperienceId, addNewExperience, updateExperience, removeExperience} = require('../controller/ExperienceController')
const verifyEmployee = require("../helper/verifyEmployee")
// const ExperienceController = require("../controller/ExperienceController.js")




router.get("/", getAllExperience)
router.get('/:id', getExperienceId )
router.post('/', verifyEmployee,  addNewExperience)
router.patch('/:id', verifyEmployee, updateExperience)
router.delete("/:id", verifyEmployee, removeExperience)


module.exports = router;