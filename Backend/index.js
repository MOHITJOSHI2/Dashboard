//Imported Files
require("./database/connection")
const saveData = require('./routes/saveData')
const getData = require('./routes/getDataRoute')
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


//Server Running
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})