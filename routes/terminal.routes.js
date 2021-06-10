const router = require('express').Router()
const TerminalModel = require('../models/terminal.model')
const FlightModel = require('../models/flight.model')

router.get('/create', async (req, res) => {
    try {
        let terminal = await TerminalModel.find()
            .populate({
                path: 'flight',
                populate: [{
                    path: 'passenger'
                }]
            })
        let flight = await FlightModel.find().populate("passenger" )
        res.render("terminal/new", { terminal, flight})
    }catch (e) {
        console.log(e)
    }
})

router.post('/create', async (req, res) => {
    try {
        let terminal = new TerminalModel(req.body)
        await terminal.save()
        await FlightModel.findByIdAndUpdate(req.body.flight, {$push: { terminal: terminal._id  }})
        res.redirect("/terminal/create")
    } catch (e) {
console.log(e)
    }
})

module.exports = router
