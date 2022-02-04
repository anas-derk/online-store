const authModel = require("../models/auth.model")

function getSignupPage(req, res){

    res.render("Signup/index", {

        signupError: req.flash('signupError')[0],
        isUser: req.session.userId,
        isAdmin: false

    })

}

function getLoginPage(req, res){

    res.render("Login/index", {

        loginError: req.flash('loginError')[0],
        isUser: req.session.userId,
        isAdmin: false

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

    authModel.login(req.body.email, req.body.password).then(result => {

        req.session.userId = result.userId

        req.session.isAdmin = result.isAdmin

        res.redirect("/")

    }).catch(err => {

        req.flash('loginError', err)

        res.redirect("/login")

    })

}

function getLogout(req, res) {

    req.session.destroy(() => {

        res.redirect('/')

    })

}

module.exports = {getSignupPage, getLoginPage, postSignup, postLogin, getLogout}