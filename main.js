const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require("mongoose");
const app = express()
require('dotenv').config()
const sessions = require('express-session')
const passport = require('./lib/passportConfig')
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
app.use('/public', express.static('public'));

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(sessions({
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 360000}
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(function(req,res,next) {
    res.locals.currentUser = req.user
    next()
})



app.use("/passenger", require('./routes/passenger.routes'))
app.use("/flight", require('./routes/flight.routes'))
app.use("/terminal", require('./routes/terminal.routes'))
app.use("/", require('./routes/airport.routes'))
app.use("/auth", require('./routes/auth.routes'))

app.listen(process.env.PORT, () => console.log(`running on ${process.env.PORT}`))
