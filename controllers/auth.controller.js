const authModel = require("../models/auth.model")

function getSignupPage(req, res){

    res.render("Signup/index")

}

function getLoginPage(req, res){

    res.render("Login/index")

}

function postSignup(req, res){

    authModel.createUserAccount(req.body.username, req.body.email, req.body.password).then(() => {

        res.redirect("/login")

    }).catch(err => {

        console.log(err)

        res.redirect("/signup")

    })

}

module.exports = {getSignupPage, getLoginPage, postSignup}