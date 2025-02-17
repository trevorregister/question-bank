const UseCase = require("../../../core/usecase")
const { Question } = require("../entities.js")
const { NotFoundError } = require("../../../core/errors.js")

module.exports = class DeleteVariableUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute({ questionId, variableId }) {
    const question = await this.repository.findById(questionId)
    if (!question) {
      throw new NotFoundError(`question ${questionId}`)
    }

    if (!question.variables.some((v) => v.id.toHexString() === variableId)) {
      throw new NotFoundError(
        ` variable ${variableId} in question ${questionId}`,
      )
    }
    const updatedQuestion = await this.repository.deleteVariableFromQuestion({
      questionId,
      variableId,
    })
    return Question.toWeb(updatedQuestion)
  }
}
