const mongoose = require('mongoose')

const Schema = mongoose.Schema

module.exports = new Schema({
    prompt: {
        type: String,
        required: true
    },

    variables: {
        type: Array,
        required: true
    },

    conditions: {
        type: Array,
        required: true
    },

    value: {
        type: Number,
        required: true
    }
})