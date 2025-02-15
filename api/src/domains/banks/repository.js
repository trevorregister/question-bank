const Repository = require("../../core/repository");
const toOid = require('../../domains/utils/toOid');

module.exports = class BankRepository extends Repository {
  constructor(model) {
    super(model);
    this.findQuestionsByBank = this.findQuestionsByBank.bind(this);
    this.addQuestionsToBank = this.addQuestionsToBank.bind(this);
  }

  async findQuestionsByBank(bankId) {
    const bank = await this.model.findById(bankId).populate("questions").exec();
    return bank ? bank.questions : [];
  }

  async addQuestionsToBank({questionIdArray, bankId}){
    const questionIds = questionIdArray.map(id => toOid(id))
    return await this.model.findOneAndUpdate(
        {
          _id: bankId
        },
        {
          $addToSet: {questions: questionIds},
        },
        { new: true }
    )
  }
};
