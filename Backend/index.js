//Imported File for database
require("./database/connection")

// Imported files for saveData and getData for excell file
const saveData = require('./routes/saveDataRoute')
const getData = require('./routes/getDataRoute')

// Imported Map routes for wards and districts
const getWards = require('./routes/getWardRoute')
const getDistricts = require('./routes/getDistrictRoute')

//Imported mistral routes
const getResponse = require('./routes/mistralRoutes/mistralRoutes')


// Library imports
const express = require('express')
const cors = require('cors')
const status = require('express-status-monitor')
require('dotenv').config({ quiet: true })

//Object Initilization
const app = express()

//Server modifications
app.use(cors())
app.use(express.json())
app.use(status())

//Routes
app.use('/data', saveData, getData)

//Map Routes
app.use('/map', getWards, getDistricts)

//Mistral ai routes
app.use('/ai', getResponse)

//Server Running
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})