function getSignupPage(req, res){

    res.render("Signup/index")

}

function getLoginPage(req, res){

    res.render("Login/index")

}

module.exports = {getSignupPage, getLoginPage}