const mongoose = require('mongoose')
const { schema } = require('./schema')

const UserModel = mongoose.model('users', schema)
module.exports = UserModel
