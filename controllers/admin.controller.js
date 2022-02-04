function getAddProductPage(req, res) {

    res.render("AddProduct/index", {

        isUser: req.session.isUser,

        isAdmin: true

    })

}

module.exports = { getAddProductPage }