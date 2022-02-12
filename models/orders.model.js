const mongoose = require("mongoose")

const ordersSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    productId: String,
    userId: String,
    address: String,
    status: {
        type: String,
        default: "Pending"
    },
    time: Date
})

const orderModel = mongoose.model("order", ordersSchema),

    cartObject = require("../models/cart.model")

const dbUrl = require("./DB_URL")

const DB_URL = dbUrl

function addNewOrder(orderInfo) {

    return new Promise((resolve, reject) => {

        mongoose.connect(DB_URL).then(() => {

            let newOrder = new orderModel(orderInfo)

            return newOrder.save()

        }).then(() => {

            mongoose.disconnect()

            resolve()

        }).catch(err => {

            mongoose.disconnect()

            reject(err)

        })

    })

}

function getOrdersByUserId(userId) {

    return new Promise((resolve, reject) => {

        mongoose.connect(DB_URL).then(() => {

            return orderModel.find({ userId: userId })

        }).then(orders => {

            mongoose.disconnect()

            resolve(orders)

        }).catch(err => {

            mongoose.disconnect()

            reject(err)

        })

    })

}

function orderCancel(productId, userId) {

    return new Promise((resolve, reject) => {

        mongoose.connect(DB_URL).then(() => {

            return orderModel.deleteOne({ productId: productId, userId: userId })

        }).then(() => {

            return cartObject.deleteItem(productId, userId)

        }).then(() => {

            mongoose.disconnect()

            resolve()

        }).catch(err => {

            mongoose.disconnect()

            reject(err)

        })

    })

}

function orders_all_cancel(userId) {

    return new Promise((resolve, reject) => {

        mongoose.connect(DB_URL).then(() => {

            return orderModel.deleteMany({ userId: userId })

        }).then(() => {

            return cartObject.cartModel.deleteMany({ userId: userId })

        }).then(() => {

            mongoose.disconnect()

            resolve()

        }).catch(err => {

            mongoose.disconnect()

            reject()

        })

    })

}

function addAllOrders(orders) {

    return new Promise((resolve, reject) => {

        mongoose.connect(DB_URL).then(() => {

            return orderModel.insertMany(orders)

        }).then(() => {

            mongoose.disconnect()

            resolve()

        }).catch(err => {

            mongoose.disconnect()

            reject(err)

        })

    })

}

function getAllOrders() {

    return new Promise( (resolve, reject) => {

        mongoose.connect(DB_URL).then(() => {

            return orderModel.find({})

        }).then(orders => {

            mongoose.disconnect()

            resolve(orders)

        }).catch(err => {

            mongoose.disconnect()

            reject(err)

        })
    
    } )

}

function orderStatusEdit(productId, newStatus) {

    return new Promise( (resolve, reject) => {

        mongoose.connect(DB_URL).then(() => {

            return orderModel.updateOne({productId: productId}, {status: newStatus})

        }).then(() => {

            mongoose.disconnect()

            resolve()

        }).catch(err => {

            mongoose.disconnect()

            reject(err)

        })

    } )

}

module.exports = {
    addNewOrder,
    getOrdersByUserId,
    orderCancel,
    orders_all_cancel,
    addAllOrders,
    getAllOrders,
    orderStatusEdit
}