const router = require("express").Router()
const userController = require("../controllers/userController")
router.post("/signup", userController.signUp)
router.post("/addFriend", userController.addFriend)
module.exports = router