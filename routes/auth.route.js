const authRouter = require("express").Router()

const authController = require("../controllers/auth.controller")

authRouter.get("/signup", authController.getSignupPage)

module.exports = authRouter