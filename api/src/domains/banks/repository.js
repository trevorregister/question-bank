const Repository = require("../../core/repository");

module.exports = class BankRepository extends Repository {
  constructor(model) {
    super(model);
    this.findQuestionsByBank = this.findQuestionsByBank.bind(this);
  }

  async findQuestionsByBank(bankId) {
    const bank = await this.model.findById(bankId).populate("questions").exec();
    return bank ? bank.questions : [];
  }
};
