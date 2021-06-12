const router = require('express').Router()
const UserModel = require('../models/user.model')

router.get('/create', async (req, res) => {
    try {
        let users = await UserModel.find()
            .populate("flight")

        res.render("users/new", {users})
    } catch (e) {
        console.log(e)
    }
})



router.post('/create', async (req, res) => {
    try {
        let user = new UserModel(req.body)
        await user.save()

        res.redirect("/users/create")
    } catch (e) {

    }
})

// router.post('/create/js', async (req, res) => {
//     try {
//         let user = new UserModel(req.body)
//         await user.save()
//
//         let users = await UserModel.find()
//             .populate({
//                 path: 'properties',
//                 populate: [{
//                     path: 'utilities'
//                 },{
//                     path: 'owner'
//                 }]
//             })
//
//         res.json({ message:  "user saved", users})
//     } catch (e) {
//         res.status(400).json({ message:  "user  not saved"})
//     }
// })

module.exports = router
