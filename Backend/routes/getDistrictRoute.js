const express = require("express")
const { getDistricts } = require("../controllers/getDistrict")

const Router = express.Router()

Router.get('/getDistricts', getDistricts)

module.exports = Router