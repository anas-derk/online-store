const productInfoRouter = require("express").Router()

const productInfoController = require("../controllers/productInfo.controller")

productInfoRouter.get("/:id", productInfoController.getProductInfo)

module.exports = productInfoRouter