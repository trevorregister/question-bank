const UseCase = require("../../../core/usecase")
const Bank = require("../entities.js")

module.exports = class CreateBankUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute({ owner, name, description = "" }) {
    const props = Bank.toDb({ owner, name, description })
    const bank = await this.repository.create(new Bank(props))
    return Bank.toWeb(bank)
  }
}
