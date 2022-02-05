const authModel = require("../models/auth.model")

function getSignupPage(req, res){

    res.render("Signup/index", {

        signupError: req.flash('authErrors')[0],

        isUser: req.session.userId,

        isAdmin: false,

        pageTitle: "Signup Page - Online Store"

    })

}

function getLoginPage(req, res){

    res.render("Login/index", {

        loginError: req.flash('authErrors')[0],

        isUser: req.session.userId,

        isAdmin: false,

        pageTitle: "Login Page - Online Store"

    })

}

function postSignup(req, res){

    authModel.createUserAccount(req.body.username, req.body.email, req.body.password).then(() => {

        res.redirect("/login")

    }).catch(err => {

        req.flash("authErrors", err)

        res.redirect("/signup")

    })

}

function postLogin(req, res){

    authModel.login(req.body.email, req.body.password).then(result => {

        req.session.userId = result.userId

        req.session.isAdmin = result.isAdmin

        res.redirect("/")

    }).catch(err => {

        req.flash('authErrors', err)

        res.redirect("/login")

    })

}

function getLogout(req, res) {

    req.session.destroy(() => {

        res.redirect('/')

    })

}

module.exports = {getSignupPage, getLoginPage, postSignup, postLogin, getLogout}