const router = require('express').Router()
const FlightModel = require('../models/flight.model')
const PassengerModel = require('../models/passenger.model')
const checkUser= require("../lib/check")

router.get('/create', checkUser, async (req, res) => {
    try {
        let passenger = await PassengerModel.find()
        let flight = await FlightModel.find().populate("passenger")
        res.render("flight/new", {flight, passenger})
    } catch (e) {
        console.log(e)
    }
})

router.post('/create', async (req, res) => {
    try {
        let flight = new FlightModel(req.body)
        await flight.save()
        let passenger = new PassengerModel(req.body)
        await passenger.save()
        await FlightModel.findByIdAndUpdate(req.body.flight, {$push: { passenger: passenger._id  }})

        res.redirect("/flight/create")
    } catch (e) {
        console.log(e)
    }
})

module.exports = router
