const router = require('express').Router()
const FlightModel = require('../models/flight.model')
const PassengerModel = require('../models/passenger.model')

router.get('/create', async (req, res) => {
    try {
        let passenger = await PassengerModel.find()
        let flight = await FlightModel.find()
        res.render("flight/new", {flight, passenger})
    } catch (e) {
        console.log(e)
    }
})

router.post('/create', async (req, res) => {
    try {
        let flight = new FlightModel(req.body)
        await flight.save()
        await PassengerModel.findByIdAndUpdate(req.body.passenger, {$push: { terminal: flight._id  }})

        res.redirect("/flight/create")
    } catch (e) {

    }
})

module.exports = router
