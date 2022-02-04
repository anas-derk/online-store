function getAddProductPage(req, res) {

    res.render("AddProduct/index", {

        isUser: req.session.userId,

        isAdmin: true

    })

}

module.exports = { getAddProductPage }