const express = require("express")
const { verify } = require("jsonwebtoken")
const router = express.Router()
const {getAllExperience,getExperienceId, addNewExperience, updateExperience} = require('../controller/ExperienceController')
// const ExperienceController = require("../controller/ExperienceController.js")
const upload = require("../helper/multer")
const verifyAuth = require("../helper/verifyAuth")



router.get("/", getAllExperience)
router.get('/:id', getExperienceId )
router.post('/',  addNewExperience)
router.patch('/:id', updateExperience)


module.exports = router;