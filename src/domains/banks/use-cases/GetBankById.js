const UseCase = require("../../../core/usecase")
const Bank = require("../entities.js")

module.exports = class GetBankByIdUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute(bankId) {
    const bank = await this.repository.getBankAndQuestions(bankId)
    return Bank.withQuestionsToWeb(bank)
  }
}
