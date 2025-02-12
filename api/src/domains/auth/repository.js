const UserModel = require('../users/data-access/model')
const QuestionModel = require('../questions/data-access/model')
const { SUBJECTS } = require('../../core/enums')
const mongoose = require('mongoose')
const { TypeError, NotFoundError } = require('../../core/errors') 
const { Question, User } = require('./subjects')

class AuthRepo {
    constructor(){
    }
    static async getResource({resourceId, subjectClass}){
        let resource = undefined
        switch(subjectClass){
            case Question:
                console.log('question')
                resource = await QuestionModel.findById(resourceId)
                break
            case User:
                resource = await UserModel.findById(resourceId)
                break
        }
        if(resource){
            return resource
        } else {
            throw new NotFoundError(` ${subjectClass.name} ${resourceId}`)
        }
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