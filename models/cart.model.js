const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    productId: Number,
    userId: String,
    timestamp: Date
})

const cartModel = mongoose.model("cart", cartSchema)

const DB_URL = "mongodb://localhost:27017/online-shop"

function add_new_item(item) {

    return new Promise( (resolve, reject) => {

        mongoose.connect(DB_URL).then( () => {

            let newItem = new cartModel(item)

            return newItem.save()

        } ).then( () => {

            mongoose.disconnect()

            resolve()

        } ).catch(err => {

            reject(err)

        })

    } )

}

function getCartsByUserId(userId){

    return new Promise( (resolve, reject) => {

        mongoose.connect(DB_URL).then(() => {

            return cartModel.find({userId: userId})

        }).then(carts => {

            mongoose.disconnect()

            resolve(carts)

        }).catch(err => {

            mongoose.disconnect()

            reject(err)

        } )

    } )

}

function deleteItem(cartId){
    
    return new Promise( (resolve, reject) => {

        mongoose.connect(DB_URL).then(() => {

            return cartModel.deleteOne({productId: cartId})

        }).then(() => {

            mongoose.disconnect()

            resolve()

        }).catch(err => {

            mongoose.disconnect()

            reject(err)
            
        } )

    } )

}

function editItem(cartId, newAmount) {

    return new Promise( (resolve, reject) => {

        mongoose.connect(DB_URL).then(() => {

            return cartModel.updateOne({productId: cartId}, {amount: newAmount})

        }).then(() => {

            mongoose.disconnect()

            resolve()

        }).catch(err => {

            reject(err)

        })

    } )

}

module.exports = { add_new_item, getCartsByUserId, deleteItem, editItem }