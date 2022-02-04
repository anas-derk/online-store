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

module.exports = {getProductInfo}