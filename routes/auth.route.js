const authRouter = require("express").Router()

const authController = require("../controllers/auth.controller")

authRouter.get("/signup", authController.getSignupPage)

authRouter.get("/login", authController.getLoginPage )

module.exports = authRouter