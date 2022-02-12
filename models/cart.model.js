const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    productId: String,
    userId: String,
    timestamp: Date
})

const cartModel = mongoose.model("cart", cartSchema)

const dbUrl = require("./DB_URL")

const DB_URL = dbUrl

function add_new_item(item) {

    return new Promise((resolve, reject) => {

        mongoose.connect(DB_URL).then(() => {

            return cartModel.findOne({ name: item.name, userId: item.userId })

        }).then(cart => {

            if (cart) {

                return cartModel.updateOne({ name: item.name, userId: item.userId }, { amount: parseInt(item.amount) + cart.amount })

            } else {

                let newItem = new cartModel(item)

                return newItem.save()
            }

        }).then(() => {

            mongoose.disconnect()

            resolve()

        }).catch(err => {

            reject(err)

        })

    })

}

function getCartsByUserId(userId) {

    return new Promise((resolve, reject) => {

        mongoose.connect(DB_URL).then(() => {

            return cartModel.find({ userId: userId })

        }).then(carts => {

            mongoose.disconnect()

            resolve(carts)

        }).catch(err => {

            mongoose.disconnect()

            reject(err)

        })

    })

}

function deleteItem(productId, userId) {

    return new Promise((resolve, reject) => {

        mongoose.connect(DB_URL).then(() => {

            return cartModel.deleteOne({ productId: productId, userId: userId })

        }).then(() => {

            mongoose.disconnect()

            resolve()

        }).catch(err => {

            mongoose.disconnect()

            reject(err)

        })

    })

}

function editItem(productId, newAmount) {

    return new Promise((resolve, reject) => {

        mongoose.connect(DB_URL).then(() => {

            return cartModel.updateOne({ productId: productId }, { amount: newAmount })

        }).then(() => {

            mongoose.disconnect()

            resolve()

        }).catch(err => {

            reject(err)

        })

    })

}

function productOrder(productInfo) {

    return new Promise( (resolve, reject) => {

        mongoose.connect(DB_URL).then(() => {

            resolve(productInfo)

        }).catch(err => {

            mongoose.disconnect()

            reject(err)

        })

    } )

}

function delete_all_item(userId) {

    return new Promise((resolve, reject) => {

        mongoose.connect(DB_URL).then(() => {

            return cartModel.deleteMany({ userId: userId })

        }).then(() => {

            resolve()

        }).catch(err => {

            reject(err)

        })

    })

}

function order_all_items(userId) {

    return getCartsByUserId(userId)

}

module.exports = {
    add_new_item,
    getCartsByUserId,
    deleteItem,
    editItem,
    delete_all_item,
    productOrder,
    order_all_items,
    cartModel
}