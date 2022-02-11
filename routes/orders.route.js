const ordersRouter = require("express").Router()

const authGuard = require("../routes/authGuards/authGuard")

const ordersCotroller = require("../controllers/orders.controller")

const bodyParser = require("body-parser")

ordersRouter.get("/orders", authGuard.isAuth, ordersCotroller.getOrdersPage)

ordersRouter.post("/orders", authGuard.isAuth, bodyParser.urlencoded({extended: true}), ordersCotroller.postOrder)

ordersRouter.post("/orders/cancel", authGuard.isAuth, bodyParser.urlencoded({extended: true}), ordersCotroller.postOrderCancel)

module.exports = ordersRouter