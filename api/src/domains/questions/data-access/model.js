const mongoose = require('mongoose')
const schema = require('./schema.js')

module.exports = class QuestionModel {
    constructor (){
        return mongoose.model('questions', schema)
    }
}