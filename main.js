const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require("mongoose");
const app = express()
require('dotenv').config()
mongoose.connect(process.env.DB, {
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("mongodb running")
})

//middlewares
app.use(express.urlencoded({extended: true}))
//static js, css, image, audio, video
app.use(express.static('node_modules'))
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.use(expressLayouts)

app.use("/passenger", require('./routes/passenger.routes'))
app.use("/flight", require('./routes/flight.routes'))
app.use("/terminal", require('./routes/terminal.routes'))
app.use("/", require('./routes/airport.routes'))

app.listen(process.env.PORT, () => console.log(`running on ${process.env.PORT}`))
