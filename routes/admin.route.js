const adminRouter = require("express").Router()

const adminController = require("../controllers/admin.controller")

const adminGuard = require("./adminGuards/adminGuard")

adminRouter.get("/add-product", adminGuard.isAdmin , adminController.getAddProductPage)

module.exports = adminRouter