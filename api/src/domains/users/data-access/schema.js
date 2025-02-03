import mongoose from "mongoose"

export const USER_ROLES = ['student', 'teacher', 'admin']

const Schema = mongoose.Schema

const schema = new Schema({
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
            values: USER_ROLES
        }
    }
})
export default schema