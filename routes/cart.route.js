const cartRouter = require("express").Router()

const cartController = require("../controllers/cart.controller")

const authGuard = require("../routes/authGuards/authGuard")

const bodyParser = require("body-parser")

cartRouter.get("/cart", authGuard.isAuth, cartController.getCartPage)

cartRouter.post("/cart", authGuard.isAuth, bodyParser.urlencoded({extended: true}), cartController.postCart)

cartRouter.post("/cart/save", authGuard.isAuth, bodyParser.urlencoded({extended: true}), cartController.postSave)

cartRouter.post("/cart/delete", authGuard.isAuth, bodyParser.urlencoded({extended: true}) , cartController.postDelete)

cartRouter.post("/cart/delete-all", authGuard.isAuth, cartController.postDeleteAll)

module.exports = cartRouter