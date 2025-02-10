const mongoose = require('mongoose')
const { QUESTION_TYPES } = require('../../../core/enums')

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

    pointValue: {
        type: Number,
        required: true
    },

    type: {
        type: String,
        required: true,
        enum: {
            values: Object.values(QUESTION_TYPES)
        }
    },

    owner: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
})