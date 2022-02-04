const productModel = require("../models/product.model")

function getProductInfo(req, res){

    let productId = +req.params.id

    productModel.get_product_info_by_id(productId).then(productInfo => {

        res.render("ProductInfo/index", {
            productInfo,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin
        })

    } )

}

function postAddProduct(req, res) {

    productModel.addProduct({

        productImageSrc: "images/products/" + req.file.originalname,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category

    }).then(() => {

        res.redirect('/')

    }).catch(err => {

        console.log(err)

    })

}

module.exports = {getProductInfo, postAddProduct}