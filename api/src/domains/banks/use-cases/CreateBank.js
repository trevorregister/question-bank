const UseCase = require("../../../core/usecase");
const Bank = require("../entities.js");

module.exports = class CreateBankUseCase extends UseCase {
  constructor(repository) {
    super(repository);
  }

  async execute({ owner, name }) {
    const props = Bank.toDb({ owner, name });
    const bank = await this.repository.create(new Bank(props));
    return Bank.toWeb(bank);
  }
};
