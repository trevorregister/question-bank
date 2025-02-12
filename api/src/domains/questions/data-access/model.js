const mongoose = require('mongoose')
const schema = require('./schema.js')

const QuestionModel = mongoose.model('questions', schema)

module.exports = QuestionModel