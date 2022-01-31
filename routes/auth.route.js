const authRouter = require("express").Router()

const authController = require("../controllers/auth.controller")

const bodyParser = require("body-parser")

authRouter.get("/signup", authController.getSignupPage)

authRouter.post("/signup", bodyParser.urlencoded({extended: true}), authController.postSignup)

authRouter.get("/login", authController.getLoginPage )

authRouter.post("/login", bodyParser.urlencoded({extended: true}), authController.postLogin)

module.exports = authRouter