const orderModel = require("../models/orders.model")

function getOrdersPage(req, res) {

    orderModel.getOrdersByUserId(req.session.userId).then(orders => {

        res.render("Orders/index", {

            orders: orders,

            isUser: true,
    
            isAdmin: req.session.isAdmin,
    
            pageTitle: "Orders Page - Online Store"
    
        })

    }).catch(err => res.redirect("/errors"))

}

function postOrder(req, res) {

    let productInfo = req.flash("productInfo")[0]

    productInfo.address = req.body.address

    productInfo.time = Date.now()

    let orderInfo = productInfo

    orderModel.addNewOrder(orderInfo).then(() => {

        res.redirect("/orders")

    }).catch(err => res.redirect("/errors"))

}

module.exports = { getOrdersPage, postOrder }