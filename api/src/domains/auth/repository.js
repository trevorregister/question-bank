const UserModel = require('../users/data-access/model')
const QuestionModel = require('../questions/data-access/model')
const { SUBJECTS } = require('../../core/enums')
const mongoose = require('mongoose')
const { TypeError, NotFoundError } = require('../../core/errors') 
const { Question } = require('./subjects')

class AuthRepo {
    constructor(){
    }

    static async getOwner({resourceId, subject}){
        let owner = undefined
        switch(subject.__proto__){
            case Question.prototype:
                const question = await QuestionModel.findById(resourceId)
                owner = question?.owner
                break
            default:
                throw new TypeError(subject)
        }

        if(owner){
            return owner
        } else {
            throw new NotFoundError(`owner of ${resourceId} for ${subject.__proto__}`)
        }
    }

    static async getQuestion(id) {
        const question = await QuestionModel.findById(id)
        if(!question) {
            throw new NotFoundError(`question ${id}`)
        }
        return question

    }

}

module.exports = AuthRepo



/* async function main(){
    await mongoose.connect('mongodb://localhost:27017/question-bank')
    const user = {id: "67aba6619f59c5d86aec542b"}
    const resource = {id: "67aba6619f59c5d86aec5454", subject: SUBJECTS.question}
    const result = await AuthRepo.getOwner(resource)
    console.log(result)
}

main() */