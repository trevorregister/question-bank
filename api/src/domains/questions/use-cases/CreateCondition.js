const UseCase = require('../../../core/usecase')
const { Question, Condition } = require('../entities.js')
const { NotFoundError } = require('../../../core/errors.js')

module.exports = class CreateExpressionUseCase extends UseCase {
    constructor(repository){
        super(repository)
    }

    async execute ({questionId, expression, isCorrect, feedback}) {
        const conditionProps = Condition.toDb({expression, isCorrect, feedback})
        const question = await this.repository.findById(questionId)
        if(!question) {
            throw new NotFoundError(`question ${questionId}`)
        }
        const condition = new Condition(conditionProps)
        const updatedQuestion = await this.repository.addConditionToQuestion({questionId, condition})
        return Question.toWeb(updatedQuestion)
        }
    }