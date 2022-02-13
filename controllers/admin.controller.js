const ordersObject = require("../models/orders.model")

function getAddProductPage(req, res) {

    res.render("AddProduct/index", {

        isUser: true,

        isAdmin: true,

        pageTitle: "Add Product - Online Store"

    })

}

function getManageOrdersPage(req, res) {

    ordersObject.getAllOrders().then(orders => {

        res.render("ManageOrders/index", {

            isUser: true,

            isAdmin: true,

            pageTitle: "Manage Orders - Online Store",

            orders: orders

        })

    }).catch(err => res.redirect("/errors"))

}

function post_order_status_edit(req, res) {

    ordersObject.orderStatusEdit(req.body.productId, req.body.orderStatus).then(() => {

        res.redirect("/admin/manage-orders")

    }).catch(err => res.redirect("/errors") )

}

function getPendingOrders(req, res) {

    ordersObject.getOrdersByStatus("Pending").then(orders => {

        res.render("ManageOrders/index", {

            isUser: true,

            isAdmin: true,

            pageTitle: "Manage Orders - Online Store",

            orders: orders

        })

    }).catch(err => res.redirect("/errors"))

}

function getSentOrders(req, res) {

    ordersObject.getOrdersByStatus("Sent").then(orders => {

        res.render("ManageOrders/index", {

            isUser: true,

            isAdmin: true,

            pageTitle: "Manage Orders - Online Store",

            orders: orders

        })

    }).catch(err => res.redirect("/errors"))

}

function getCompletedOrders(req, res) {

    ordersObject.getOrdersByStatus("Completed").then(orders => {

        res.render("ManageOrders/index", {

            isUser: true,

            isAdmin: true,

            pageTitle: "Manage Orders - Online Store",

            orders: orders

        })

    }).catch(err => res.redirect("/errors"))

}

module.exports = {
    getAddProductPage,
    getManageOrdersPage,
    post_order_status_edit,
    getPendingOrders,
    getSentOrders,
    getCompletedOrders
}