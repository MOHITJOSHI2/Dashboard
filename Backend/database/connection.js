//Library Import
const mongoose = require('mongoose')

//Configuration for .env file
require("dotenv").config({ quiet: true })

//mongoDB connection establishment
mongoose.connect(process.env.DATABASE)
    .then(() => { console.log("Database connected Successfully") })
    .catch((err) => { console.log("Connection failed \n", err) })