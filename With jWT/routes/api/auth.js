const express = require("express");
const authController = require('../../controllers/authController')
const router = express.Router();


router.post('/logout',authController.handleLogout);
router.get('/home',authController.handleWelcome);
router.route('/')
.post(authController.handlelogin);

module.exports = router;