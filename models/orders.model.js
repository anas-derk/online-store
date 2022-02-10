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

const orderModel = mongoose.model("order", ordersSchema)

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

module.exports = { addNewOrder, getOrdersByUserId }