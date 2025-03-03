const UseCase = require("../../../core/usecase.js")
const Bank = require("../entities.js")
const { NotFoundError } = require("../../../core/errors")

module.exports = class DeleteBank extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute(bankId) {
    const bank = await this.repository.findById(bankId)
    if (!bank) {
      throw new NotFoundError(`Bank ${bankId} not found`)
    }
    const deleteBank = await this.repository.deleteBank(bankId)
    return Bank.toWeb(deleteBank)
  }
}
