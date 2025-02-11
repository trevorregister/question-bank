const UseCase = require('../../../core/usecase')
const { Question } = require('../entities.js')
const { HttpError, NotFoundError } = require('../../../core/errors.js')

module.exports = class CreateVariableUseCase extends UseCase {
    constructor(repository){
        super(repository)
    }

    async execute (ownerId) {
        
        const questions = await this.repository.findQuestionsByOwner(ownerId)
        return questions.map(q => Question.toWeb(q))
        }
    }