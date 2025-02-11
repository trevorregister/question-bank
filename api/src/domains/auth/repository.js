const UserModel = require('../users/data-access/model')
const QuestionModel = require('../questions/data-access/model')
const { SUBJECTS } = require('../../core/enums')
const mongoose = require('mongoose')
const { TypeError, NotFoundError } = require('../../core/errors') 

class AuthorizationRepository {
    constructor(){
    }

    static async getOwner({resourceId, subject}){
        let owner = undefined
        switch(subject){
            case SUBJECTS.Question:
                const question = await QuestionModel.findById(resourceId)
                if(!question){
                    throw new NotFoundError(`question ${resourceId}`)
                } else {
                    owner = question.owner
                    break
                }
            default:
                throw new TypeError(subject)
        }

        return owner
    }

}

module.exports = new AuthorizationRepository()



async function main(){
    await mongoose.connect('mongodb://localhost:27017/question-bank')
    const user = {id: "67aba6619f59c5d86aec542b"}
    const resource = {id: "67aba6619f59c5d86aec5454", subject: SUBJECTS.question}
    const result = await AuthorizationRepository.getOwner(resource)
    console.log(result)
}

main()