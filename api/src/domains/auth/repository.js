const UserModel = require('../users/data-access/model')
const QuestionModel = require('../questions/data-access/model')
const { NotFoundError } = require('../../core/errors') 
const { Question, User } = require('./subjects')

class AuthRepo {
    constructor(){
    }
    static async getResource({resourceId, subjectClass}){
        let resource = undefined
        switch(subjectClass){
            case Question:
                resource = await QuestionModel.findById(resourceId)
                break
            case User:
                resource = await UserModel.findById(resourceId)
                break
        }
        if(resource){
            return resource
        } else {
            throw new NotFoundError(`resource ${subjectClass.name} ${resourceId}`)
        }
    }

}

module.exports = AuthRepo