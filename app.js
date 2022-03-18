// require external modules

const express   = require("express"),
        path    = require("path"),
        session = require("express-session"),
        flash = require("connect-flash")

const MongoDBStore = require("connect-mongodb-session")(session)

// creating express app

const app = express()

// config the settings for express app

app.set("view engine", "ejs")

app.set("views", "views") // default

// direct the browser to statics files path

app.use( express.static( path.join(__dirname, "statics") ) )

// use express session module

const DB_URL = require("./models/DB_URL")

const store = new MongoDBStore({
    uri: DB_URL,
    collection: "sessions"
})

app.use(session({
        secret: 'woot',
        saveUninitialized: false,
        resave: false,
        store: store
    })
)

// use flash module globally for share data in flash session

app.use(flash())

// routes handling

const   homeRouter = require("./routes/home.route"),
        productInfoRouter = require("./routes/productInfo.route"),
        authRouter = require("./routes/auth.route"),
        cartRouter = require("./routes/cart.route"),
        adminRouter = require("./routes/admin.route"),
        ordersRouter = require("./routes/orders.route")

app.use('/', homeRouter)

app.use("/product-info", productInfoRouter)

app.use('/', authRouter)

app.use('/', cartRouter)

app.use("/admin", adminRouter)

app.use("/", ordersRouter)

app.use("/errors", (req, res) => {

    res.status(500).render("errorsNotExpected/index", {pageTitle: "Errors Page"})

})

app.use( (req, res) => {

    res.status(404).render("pageNotFound/index", {pageTitle: "Page Not Found"} )

} )

const port = process.env.PORT || 3000

app.listen(port, (err) => {

    console.log("The server is running on: http://localhost:" + port)

} )