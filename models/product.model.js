const mongoose = require("mongoose")

const productSchema = mongoose.Schema(
    {
        _id: Object,
        productImageSrc: String,
        name: String,
        price: Number,
        description: String,
        category: String
    }
)

const productModel = mongoose.model("product", productSchema)

const DB_URL = "mongodb://localhost:27017/online-shop"

function get_all_products_info(){

    return new Promise( (resolve, reject) => {

        mongoose.connect(DB_URL).then( () => {

            return productModel.find()

        } ).then( productsInfo => {

            resolve(productsInfo)

        } ).catch(err => {

            reject(err)

        })

    } )

}

module.exports = {get_all_products_info}