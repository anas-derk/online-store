const adminRouter = require("express").Router()

const adminController = require("../controllers/admin.controller")

const adminGuard = require("./adminGuards/adminGuard")

const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "statics/images/products")
    },
    filename: (req, res, cb) => {
        cb(null, Date.now() + "clothes.jpg")
    }
})

const upload = multer({storage: storage})

const bodyParser = require("body-parser")

const productController = require("../controllers/productInfo.controller")

adminRouter.get("/add-product", adminGuard.isAdmin, adminController.getAddProductPage)

adminRouter.post(
    "/add-product",
    adminGuard.isAdmin,
    upload.single('file'),
    bodyParser.urlencoded({extended: true}),
    productController.postAddProduct
)

module.exports = adminRouter