function isAuth(req, res, next) {

    if(req.session.userId) next()

    else res.redirect("/login")

}

function isNotAuth(req, res, next) {

    if(!req.session.userId) next()

    else res.redirect('/')

}

module.exports = {isAuth, isNotAuth}