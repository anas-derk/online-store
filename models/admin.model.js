const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    _id: Object,
    productImageSrc: String,
    name: String,
    price: Number,
    description: String,
    category: String
})

const productModel = mongoose.model('product', productSchema)

const DB_URL = "mongodb://localhost:27017/online-shop"

module.exports = { addProduct }