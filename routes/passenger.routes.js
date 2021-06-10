const router = require('express').Router()
const PassengerModel = require('../models/passenger.model')

router.get('/create', async (req, res) => {
    try {
        let passenger = await PassengerModel.find()
        res.render("passenger/new", {passenger})
    } catch (e) {
console.log(e)
    }
})

router.post('/create', async (req, res) => {
    try {
        let passenger = new PassengerModel(req.body)
        await passenger.save()
        res.redirect("/passenger/create")
    } catch (e) {
        console.log(e)
    }
})

module.exports = router
