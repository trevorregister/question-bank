const UseCase = require('../../../core/usecase')
const { Question } = require('../entities.js')
const { HttpError, NotFoundError } = require('../../../core/errors.js')

module.exports = class UpdateQuestionUseCase extends UseCase {
    constructor(repository){
        super(repository)
    }

    async execute ({questionId, payload}) {
        const question = this.repository.findById(questionId)
        if(!question){
            throw new NotFoundError(`question ${questionId}`)
        }
        const updatedQuestion = await this.repository.updateQuestion({questionId, payload})
        return Question.toWeb(updatedQuestion)
        }
    }