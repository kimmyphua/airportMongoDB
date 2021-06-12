const router = require('express').Router()
const UserModel = require('../models/user.model')
const passport = require('../lib/passportConfig')
const bcrypt = require('bcrypt')


router.get('/register', (req, res) => {
    res.render("auth/register")
})

router.post('/register', async (req, res) => {
    try {

        let user = new UserModel(req.body)
        console.log(user)
        //salt rounds
        user.password = await bcrypt.hash(user.password, 10)
        console.log(user)
        await user.save()
        res.redirect("/")
    } catch (e) {
        console.log(e)
    }
})

router.get('/login', (req, res) => {
    console.log(req.user)
    console.log(req.sessionID)
    res.render("auth/login")
})

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: false
    })
);

// router.get('/auth/facebook',
//     passport.authenticate('facebook'));

// router.get('/login', (req, res) => {
//     console.log(req.user)
//     console.log(req.sessionID)
//     res.render("auth/login")
// })

router.get('/facebook', passport.authenticate('facebook', {scope: 'email'}))


router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: false
    })
);




// router.get('/auth/facebook/',
//     passport.authenticate('facebook',
//         { failureRedirect: '/login' ,
//             successRedirect: '/',}),
//     function(req, res) {
//         // Successful authentication, redirect home.
//         res.redirect('/');
//     });



// router.post('/fb',
//     passport.authenticate('local', {
//         successRedirect: '/',
//         failureRedirect: '/auth/login',
//         failureFlash: false
//     })
// );



// router.post('/login',(req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//         console.log('Inside passport.authenticate() callback');
//         console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
//         console.log(`req.user: ${JSON.stringify(req.user)}`)
//         req.login(user, (err) => {
//             console.log('Inside req.login() callback')
//             console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
//             console.log(`req.user: ${JSON.stringify(req.user)}`)
//             return res.redirect('/');
//         })
//     })(req, res, next);
// });


router.get("/logout", (req, res) => {
    req.logout()
    res.redirect("/auth/login")
})

module.exports = router
