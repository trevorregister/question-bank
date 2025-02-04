const mongoose = require('mongoose')
const schema = require('./schema.js')

export default class QuestionModel {
    constructor (){
        return mongoose.model('questions', schema)
    }
}