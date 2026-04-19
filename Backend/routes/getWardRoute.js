const express = require("express")
const { getWards } = require("../controllers/getWards")

const Router = express.Router()

Router.get('/getWards', getWards)

module.exports = Router