const productObject = require("../models/product.model")

function getHomePage(req, res) {

    let category = req.query.category

    if (category === "all" || category === undefined) {

        productObject.get_all_products_info().then(productsInfo => {

            res.render("Home/index", {
                productsInfo,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                pageTitle: "Home Page - Online Store",
                notFoundProducts: ''
            })

        }).catch(err => {

            if(err === "There is not Products !!") {
            
                req.flash("notFoundProductsError", err)

                res.render("Home/index", {
                    productsInfo: [],
                    isUser: req.session.userId,
                    isAdmin: req.session.isAdmin,
                    pageTitle: "Home Page - Online Store",
                    notFoundProducts: req.flash("notFoundProductsError")[0]
                })

            } else {

                res.redirect("/errors")
            
            }
        
        })

    } else {

        productObject.get_products_by_category(category).then(productsInfo => {

            res.render("Home/index", {
                productsInfo,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                pageTitle: "Home Page - Online Store",
                notFoundProducts: ''
            })

        }).catch(err => {

            if(err === "There is not Products !!") {
            
                req.flash("notFoundProductsError", err)

                res.render("Home/index", {
                    productsInfo: [],
                    isUser: req.session.userId,
                    isAdmin: req.session.isAdmin,
                    pageTitle: "Home Page - Online Store",
                    notFoundProducts: req.flash("notFoundProductsError")[0]
                })

            } else {

                res.redirect("/errors")
            
            }

        })

    }

}

module.exports = { getHomePage }