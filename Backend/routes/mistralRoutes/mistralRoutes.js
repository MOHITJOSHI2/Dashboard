const { getResponse } = require("../../controllers/mistralController/mistralResponse");
const express = require('express')
const router = express.Router()

router.post('/getResponse', getResponse)


module.exports = router

