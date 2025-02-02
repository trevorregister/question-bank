import mongoose from "mongoose"

const Schema = mongoose.Schema

export default new Schema({
    email: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true,
        enum: {
            values: ['student', 'teacher', 'admin']
        }
    }
})