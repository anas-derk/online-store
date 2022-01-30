const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const userModel = mongoose.model("user", userSchema)

const DB_URL = "mongodb://localhost:27017/online-shop" 

const bcrypt = require("bcrypt")

function createUserAccount(userName, email, password){

    return new Promise( (resolve, reject) => {

        mongoose.connect(DB_URL).then(() => {

            return userModel.find({email: email})

        }).then(user => {

            // Check if user is exists
    
            if(user.length !== 0) {
    
                mongoose.disconnect()
    
                reject("The User is exists !!")
    
            } else {

                return bcrypt.hash(password, 10)
    
            }
    
        }).then(cryptedPassword => {
            // create new user
            
            let newUser = new userModel({
                username: userName,
                email: email,
                password: cryptedPassword
            })

            return newUser.save()

        }).then(() => {

            mongoose.disconnect()

            resolve()

        }).catch(err => {

            mongoose.disconnect()

            reject(err)

        })
    })

}

function login(email, password){

    return new Promise( (resolve, reject) => {

        mongoose.connect(DB_URL).then(() => {

            return userModel.find({email: email})

        }).then(user => {

            if(user.length === 0){

                mongoose.disconnect()

                reject("There is no email matches This Email !!")

            } else {

                return bcrypt.compare(password, user[0].password)

            }

        }).then(passwordIsTrue => {

            if(passwordIsTrue) {

                mongoose.disconnect()

                resolve()
                
            } else {
                
                mongoose.disconnect()

                reject("Password is not true !!")

            }

        })

    } )

}

module.exports = {createUserAccount, login}