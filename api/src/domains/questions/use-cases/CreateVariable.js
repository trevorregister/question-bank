const UseCase = require("../../../core/usecase");
const { Question, Variable } = require("../entities.js");
const { NotFoundError } = require("../../../core/errors.js");

module.exports = class CreateVariableUseCase extends UseCase {
  constructor(repository) {
    super(repository);
  }

  async execute({ questionId, type, min, max, step }) {
    const variableProps = Variable.toDb({ type, min, max, step });
    const question = await this.repository.findById(questionId);
    if (!question) {
      throw new NotFoundError(`question ${questionId}`);
    }
    const variable = new Variable(variableProps);
    const updatedQuestion = await this.repository.addVariableToQuestion({
      questionId,
      variable,
    });
    return Question.toWeb(updatedQuestion);
  }
};
