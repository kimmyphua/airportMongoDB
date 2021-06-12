const router = require('express').Router()
const FlightModel = require('../models/flight.model')
const PassengerModel = require('../models/passenger.model')

router.get('/create', async (req, res) => {
    try {
        let flight = await FlightModel.find()
        let passenger = await PassengerModel.find().populate("flight")
        res.render("passenger/new", {passenger,flight})
    } catch (e) {
console.log(e)
    }
})

router.post('/create', async (req, res) => {
    try {
        let passenger = new PassengerModel(req.body)
        await passenger.save()
        await FlightModel.findByIdAndUpdate(req.body.flight, {$push: { passenger: passenger._id  }})

        res.redirect("/passenger/create")
    } catch (e) {
        console.log(e)
    }
})

module.exports = router
