const CreateBankUseCase = require("./CreateBank")
const GetMyBanksUseCase = require("./GetMyBanks")
const GetBankQuestionsUseCase = require("./GetBankQuestions")
const AddQuestionsToBank = require("./AddQuestionsToBank")
const RemoveQuestionsFromBank = require("./RemoveQuestionsFromBank")
const DeleteBank = require("./DeleteBank")
const GetBankByIdUseCase = require("./GetBankById")

module.exports = {
  CreateBankUseCase,
  GetMyBanksUseCase,
  GetBankQuestionsUseCase,
  AddQuestionsToBank,
  RemoveQuestionsFromBank,
  DeleteBank,
  GetBankByIdUseCase,
}
