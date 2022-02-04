const mongoose = require("mongoose")

const productSchema = mongoose.Schema(
    {
        id: Number,
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

            mongoose.disconnect()

            resolve(productsInfo)

        } ).catch(err => {

            mongoose.disconnect()

            reject(err)

        })

    } )

}

function get_products_by_category(category){

    return new Promise( (resolve, reject) => {

        mongoose.connect(DB_URL).then( () => {

            return productModel.find({category: category})

        } ).then(productsInfo => {

            mongoose.disconnect()

            resolve(productsInfo)

        }).catch(err => {

            mongoose.disconnect()

            reject(err)

        })
        
    } )

}

function get_product_info_by_id(id){

    return new Promise( (resolve, reject) => {

        mongoose.connect(DB_URL).then( () => {

            return productModel.findOne({id: id})

        } ).then(productInfo => {

            mongoose.disconnect()

            resolve(productInfo)

        }).catch(err => {

            mongoose.disconnect()

            reject(err)

        })

    } )

}

function addProduct(productInfo) {

    return new Promise( (resolve, reject) => {
    
        mongoose.connect(DB_URL).then(() => {

            let newProduct = new productModel(productInfo)

            return newProduct.save()
        
        }).then(() => {

            resolve()

        }).catch(err => {

            reject(err)
        
        })

    } )

}

module.exports = {get_all_products_info, get_products_by_category, get_product_info_by_id, addProduct}