const authRouter = require("express").Router()

const authController = require("../controllers/auth.controller")

const bodyParser = require("body-parser")

const authGuard = require("./authGuards/authGuard")

authRouter.get("/signup", authGuard.isNotAuth, authController.getSignupPage)

authRouter.post("/signup", bodyParser.urlencoded({extended: true}), authController.postSignup)

authRouter.get("/login", authGuard.isNotAuth, authController.getLoginPage )

authRouter.post("/login", bodyParser.urlencoded({extended: true}), authController.postLogin)

authRouter.get("/logout", authGuard.isAuth ,authController.getLogout)

module.exports = authRouter