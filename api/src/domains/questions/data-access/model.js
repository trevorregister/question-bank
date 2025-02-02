import mongoose from "mongoose"
import schema from "./schema.js"

export default class QuestionModel {
    constructor (){
        return mongoose.model('questions', schema)
    }
}