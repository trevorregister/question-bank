const UseCase = require("../../../core/usecase.js");
const Bank = require("../entities.js");

module.exports = class AddQuestionsToBank extends UseCase {
  constructor(repository) {
    super(repository);
  }

  async execute({ questionIdsArray, bankId }) {}
};
