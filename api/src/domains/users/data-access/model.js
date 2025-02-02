import mongoose from "mongoose"
import schema from "./schema.js"

export default class UserModel {
    constructor (){
        return mongoose.model('users', schema)
    }
}