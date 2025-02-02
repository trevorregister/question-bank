import mongoose from "mongoose"

const Schema = mongoose.Schema

export default new Schema({
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