const productModel = require("../models/product.model")

function getHomePage(req, res) {

    let category = req.query.category

    if (category === "all" || category === "") {

        productModel.get_all_products_info().then(productsInfo => {

            res.render("Home/index", {
                productsInfo,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                pageTitle: "Home Page - Online Store"
            })

        })

    } else {

        productModel.get_products_by_category(category).then(productsInfo => {

            res.render("Home/index", {
                productsInfo,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                pageTitle: "Home Page - Online Store"
            })

        })

    }

}

module.exports = { getHomePage }