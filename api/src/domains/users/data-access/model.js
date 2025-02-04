const mongoose = require('mongoose')
const { schema } = require('./schema')

module.exports = class UserModel {
    constructor (){
        return mongoose.model('users', schema)
    }
}