module.exports = function (req, res, next){
    console.log("started check")
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect("/auth/login")
    }
}
