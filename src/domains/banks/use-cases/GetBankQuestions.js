const UseCase = require("../../../core/usecase.js")
const QuestionModel = require("../../questions/data-access/model.js")
const { Question } = require("../../questions/entities.js")

module.exports = class GetBankQuestionsUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute(bankId) {
    const questions = await this.repository.findQuestionsByBank(bankId)
    return questions.map((q) => Question.toWeb(q))
  }
}
