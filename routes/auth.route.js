const authRouter = require("express").Router()

const authController = require("../controllers/auth.controller")

const bodyParser = require("body-parser")

authRouter.get("/signup", authController.getSignupPage)

authRouter.post("/signup", bodyParser.urlencoded({extended: true}), authController.postSignup)

authRouter.get("/login", authController.getLoginPage )

authRouter.all("/login", bodyParser.urlencoded({extended: true}), authController.allLogin)

module.exports = authRouter