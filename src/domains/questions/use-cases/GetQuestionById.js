const UseCase = require("../../../core/usecase")
const { Question } = require("../entities.js")

module.exports = class GetQuestionById extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute(questionId) {
    const question = await this.repository.findById(questionId)
    return Question.toWeb(question)
  }
}
