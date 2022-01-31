const authModel = require("../models/auth.model")

function getSignupPage(req, res){

    res.render("Signup/index", {

        signupError: req.flash('signupError')[0]

    })

}

function getLoginPage(req, res){

    res.render("Login/index", {

        loginError: req.flash('loginError')[0]

    })

}

function postSignup(req, res){

    authModel.createUserAccount(req.body.username, req.body.email, req.body.password).then(() => {

        res.redirect("/login")

    }).catch(err => {

        req.flash('signupError', err)

        res.redirect("/signup")

    })

}

function postLogin(req, res){

    authModel.login(req.body.email, req.body.password).then(() => {

        res.redirect("/")

    }).catch(err => {

        req.flash('loginError', err)

        res.redirect("/login")

    })

}

module.exports = {getSignupPage, getLoginPage, postSignup, postLogin}