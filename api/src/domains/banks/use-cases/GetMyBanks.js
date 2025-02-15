const UseCase = require("../../../core/usecase");
const Bank = require("../entities.js");

module.exports = class GetMyBanksUseCase extends UseCase {
  constructor(repository) {
    super(repository);
  }

  async execute(ownerId) {
    const banks = await this.repository.findAllByOwner(ownerId);
    return banks.map((b) => Bank.toWeb(b));
  }
};
