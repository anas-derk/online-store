const adminRouter = require("express").Router()

const adminController = require("../controllers/admin.controller")

const adminGuard = require("./adminGuards/adminGuard")

const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "statics/images/products/addedProductsImages")
    },
    filename: (req, res, cb) => {
        cb(null, Date.now() + "newProduct.jpg")
    }
})

const upload = multer({storage: storage})

const productController = require("../controllers/productInfo.controller")

const bodyParser = require("body-parser")

adminRouter.get("/add-product", adminGuard.isAdmin, adminController.getAddProductPage)

adminRouter.post(
    "/add-product",
    adminGuard.isAdmin,
    upload.single('file'),
    bodyParser.urlencoded({extended: true}),
    productController.postAddProduct
)

adminRouter.get("/manage-orders", adminGuard.isAdmin, adminController.getManageOrdersPage)

adminRouter.post(
    "/manage-orders/order-status-edit",
    adminGuard.isAdmin,
    bodyParser.urlencoded({extended: true}),
    adminController.post_order_status_edit
)

module.exports = adminRouter