const UseCase = require("../../../core/usecase.js");
const Bank = require("../entities.js");
const {NotFoundError} = require("../../../core/errors");

module.exports = class AddQuestionsToBank extends UseCase {
  constructor(repository) {
    super(repository);
  }

  async execute({ questionIdArray, bankId }) {
    const bank = await this.repository.findById(bankId)
    if(!bank) {
      throw new NotFoundError(`Bank ${bankId} not found`)
    }
    const payload = {questionIdArray: questionIdArray, bankId: bank._id};
    const updatedBank = await this.repository.addQuestionsToBank(payload)
    return Bank.toWeb(updatedBank)
  }
};
