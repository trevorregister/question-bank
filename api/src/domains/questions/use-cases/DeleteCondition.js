const UseCase = require('../../../core/usecase.js')
const { Question } = require('../entities.js')
const { NotFoundError } = require('../../../core/errors.js')

module.exports = class DeleteConditionUseCase extends UseCase {
    constructor(repository){
        super(repository)
    }

    async execute ({questionId, conditionId}) {
        const question = await this.repository.findById(questionId)
        if(!question) {
            throw new NotFoundError(`question ${questionId}`)
        }
        if(!question.conditions.some(c => c.id.toHexString() === conditionId)){
            throw new NotFoundError(` condition ${conditionId} in question ${questionId}`)
        }
        const updatedQuestion = await this.repository.deleteConditionFromQuestion({questionId, conditionId})
        return Question.toWeb(updatedQuestion)
        }
    }