const router = require('express').Router()
const AirportModel = require('../models/airport.model')
const FlightModel = require('../models/flight.model')
const TerminalModel = require('../models/terminal.model')
const checkUser= require("../lib/check")

router.get('/', checkUser,async (req, res) => {
    try {

        let airport = await AirportModel.find()
            .populate({
                path: 'terminal',
                populate: [{
                    path: 'flight'
                }]
            })
        let terminal = await TerminalModel.find().populate("flight" )

        res.render("airport/index", {airport,terminal})
    } catch (e) {
console.log(e)
    }
})

// router.get('/', async (req, res) => {
//     try {
//         let terminal = await TerminalModel.find().populate("flight" )
//
//         res.render("airport/index", { terminal})
//     }catch (e) {
//
//     }
// })

router.post('/', async (req, res) => {
    try {
        console.log(req.body)

        let airport = new AirportModel(req.body)
        await airport.save()
        await TerminalModel.findByIdAndUpdate(req.body.terminal, {$push: { airport: airport._id  }})
        res.redirect("/")
    } catch (e) {
        console.log(e)
    }
})

module.exports = router
