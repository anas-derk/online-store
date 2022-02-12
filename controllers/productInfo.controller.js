const productObject = require("../models/product.model")

function getProductInfo(req, res) {

    let productId = req.params.id

    productObject.get_product_info_by_id(productId).then(productInfo => {

        res.render("ProductInfo/index", {
            productInfo,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            pageTitle: "Product Info Page - Online Store"
        })

    })

}

function postAddProduct(req, res) {

    productObject.addProduct({

        productImageSrc: "images/products/" + req.file.originalname,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category

    }).then(() => {

        res.redirect('/')

    }).catch(err => {

        res.redirect("/errors")

    })

}

module.exports = { getProductInfo, postAddProduct }