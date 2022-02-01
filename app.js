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

const store = new MongoDBStore({
    uri: "mongodb://localhost:27017/online-shop",
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
        authRouter = require("./routes/auth.route")

app.use('/', homeRouter)

app.use("/product-info", productInfoRouter)

app.use('/', authRouter)

app.use( (req, res) => {

    res.status(404).render("pageNotFound/index")

} )

app.listen(3000, "localhost", (err) => {

    console.log("The server is running on: http://localhost:3000")

} )