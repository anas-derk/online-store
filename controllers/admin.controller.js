function getAddProductPage(req, res) {

    res.render("AddProduct/index", {

        isUser: req.session.userId,

        isAdmin: true,

        pageTitle: "Add Product - Online Store"

    })

}

module.exports = { getAddProductPage }