const cartModel = require("../models/cart.model")

function getCartPage(req, res) {

    cartModel.getCartsByUserId(req.session.userId).then(carts => {

        res.render("Cart/index", {

            isUser: true,

            carts: carts

        })

    }).catch(err => console.log(err))

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

        res.redirect('/')

    })

}

function postSave(req, res) {

    cartModel.editItem(req.body.cartId, req.body.amount).then(() => {

        res.redirect("/cart")

    }).catch(err => {

        res.redirect('/')

    })

}

function postDelete(req, res) {

    cartModel.deleteItem(req.body.cartId).then(() => {

        res.redirect("/cart")

    }).catch(err => console.log(err))

}

module.exports = { getCartPage, postCart, postDelete, postSave }