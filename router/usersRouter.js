const express = require("express")
const router = express.Router()
const {getAllUsers,getUsersId, addNewUsers, updateUsers} = require('../controller/UsersController')
// const usersController = require("../controller/usersController.js")




router.get("/", getAllUsers)
router.get('/:user_id', getUsersId )
router.post('/',  addNewUsers)
router.patch('/:user_id', updateUsers)


module.exports = router;