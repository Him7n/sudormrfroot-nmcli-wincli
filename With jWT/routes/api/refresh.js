const express = require("express");
const refreshTokenController = require('../../controllers/refreshTokenController')
const router = express.Router();


router.route('/')
.post(refreshTokenController.HandleRefreshToken);

module.exports = router;