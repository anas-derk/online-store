const cartModel = require("../models/cart.model")

function getCartPage(req, res) {

    cartModel.getCartsByUserId(req.session.userId).then(carts => {

        res.render("Cart/index", {

            isUser: true,

            carts: carts,

            isAdmin: req.session.isAdmin,

            pageTitle: "Cart Page - Online Store"

        })

    }).catch(err => res.redirect("/errors") )

}

function postCart(req, res) {

    cartModel.add_new_item({

        name: req.body.name,

        price: req.body.price,

        amount: req.body.amount,

        productId: req.body.productId,

        userId: req.session.userId,

        timestamp: Date.now()

    }).then(() => {

        res.redirect("/cart")

    }).catch(err => {

        res.redirect("/errors")

    })

}

function postSave(req, res) {

    cartModel.editItem(req.body.cartId, req.body.amount).then(() => {

        res.redirect("/cart")

    }).catch(err => {

        res.redirect("/errors")

    })

}

function postOrder(req, res) {

    cartModel.productOrder({

        name: req.body.name,

        price: req.body.price,

        amount: req.body.amount,

        productId: req.body.productId,

        userId: req.session.userId,

        timestamp: Date.now()

    }).then(productInfo => {

        req.flash("productInfo", productInfo)

        res.redirect("/cart/verify-orders")

    }).catch(err => res.redirect("/errors") )

}

function getVerifyOrdersPage(req, res) {

    res.render("VerifyOrders/index", {

        isUser: true,

        isAdmin: req.session.isAdmin,

        pageTitle: "Verify Orders Page - Online Store"
    
    })

}

function postDelete(req, res) {

    cartModel.deleteItem(req.body.cartId, req.session.userId).then(() => {

        res.redirect("/cart")

    }).catch(err => res.redirect("/errors") )

}

function postDeleteAll(req, res){

    cartModel.delete_all_item(req.session.userId).then(() => {

        res.redirect("/cart")

    }).catch(err => res.redirect("/errors") )

}

function postOrderAll(req, res) {

    cartModel.order_all_item().then(() => {



    }).catch(err => res.redirect("/errors") )

}

module.exports = {
    getCartPage,
    postCart,
    postDelete,
    postSave,
    postDeleteAll,
    postOrder,
    postOrderAll,
    getVerifyOrdersPage
}