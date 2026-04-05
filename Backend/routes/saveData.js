const express = require("express")
const { saveData } = require("../controllers/saveData")

const Router = express.Router()

Router.post('/saveData', saveData)

module.exports = Router