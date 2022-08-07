const express = require("express")

const router = express.Router()
const {getAllEmployees,getEmployeesId, addNewEmployees, updateEmployees} = require('../controller/employeesController')
// const EmployeesController = require("../controller/EmployeesController.js")





router.get("/", getAllEmployees)
router.get('/:id', getEmployeesId )
router.post('/',addNewEmployees)
router.patch('/:id', updateEmployees)


module.exports = router;