const express = require("express")
const router = express.Router()
const {getAllEmployees,getEmployeesId, addNewEmployees, updateEmployees} = require('../controller/employeesController')
const { uploadProfile } = require("../helper/upload")
const verifyEmployee = require("../helper/verifyEmployee")


router.get("/", getAllEmployees)
router.get('/:id', getEmployeesId )
router.post('/', addNewEmployees)
router.patch('/:id',  uploadProfile, verifyEmployee, updateEmployees)


module.exports = router;