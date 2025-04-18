const UseCase = require("../../../core/usecase")
const { Question } = require("../entities.js")

module.exports = class CreateQuestionUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute({
    prompt,
    pointValue,
    type,
    owner,
    variables = [],
    conditions = [],
  }) {
    const questionProps = Question.toDb({
      prompt,
      pointValue,
      type,
      owner,
      variables,
      conditions,
    })
    const question = await this.repository.create(new Question(questionProps))
    return Question.toWeb(question)
  }
}
