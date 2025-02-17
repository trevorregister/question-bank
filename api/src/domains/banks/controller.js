const {
  CreateBankUseCase,
  GetMyBanksUseCase,
  GetBankQuestionsUseCase,
  AddQuestionsToBank,
  RemoveQuestionsFromBank,
} = require("./use-cases/index")

module.exports = class BankController {
  constructor(repository) {
    this.repository = repository
    this.create = this.create.bind(this)
    this.getMyBanks = this.getMyBanks.bind(this)
    this.getBankQuestions = this.getBankQuestions.bind(this)
    this.addQuestionsToBank = this.addQuestionsToBank.bind(this)
    this.removeQuestionsFromBank = this.removeQuestionsFromBank.bind(this)
  }

  async create(req, res, next) {
    try {
      const createBankCase = new CreateBankUseCase(this.repository)
      const data = { ...req.body, owner: req.user.id }
      const result = await createBankCase.execute(data)
      res.status(201).send(result)
    } catch (err) {
      next(err)
    }
  }

  async getMyBanks(req, res, next) {
    try {
      const getMyBanksCase = new GetMyBanksUseCase(this.repository)
      const { ownerId } = req.params
      const result = await getMyBanksCase.execute(ownerId)
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  async getBankQuestions(req, res, next) {
    try {
      const getBankQuestionsCase = new GetBankQuestionsUseCase(this.repository)
      const { bankId } = req.params
      const result = await getBankQuestionsCase.execute(bankId)
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  async addQuestionsToBank(req, res, next) {
    try {
      const addQuestionsToBankCase = new AddQuestionsToBank(this.repository)
      const { bankId } = req.params
      const { questionIdArray } = req.body
      const data = { bankId: bankId, questionIdArray: questionIdArray }
      const result = await addQuestionsToBankCase.execute(data)
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  async removeQuestionsFromBank(req, res, next) {
    try {
      const removeQuestionsFromBankCase = new RemoveQuestionsFromBank(
        this.repository,
      )
      const { bankId } = req.params
      const { questionIdArray } = req.body
      const data = { bankId: bankId, questionIdArray: questionIdArray }
      const result = await removeQuestionsFromBankCase.execute(data)
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }
}
