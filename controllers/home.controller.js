const productModel = require("../models/product.model")

function getHomePage(req, res) {

    productModel.get_all_products_info().then(productsInfo => {

        res.render("Home/index", {productsInfo})

    })

}

module.exports = { getHomePage }