const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    name: {
        type: String,
        required: true
    },

    isArchived: {
        type: Boolean,
        required: true
    },

    isDeleted: {
        type: Boolean,
        required: true
    },

    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})
module.exports = {
    schema,
}