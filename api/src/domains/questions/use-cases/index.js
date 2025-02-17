const CreateQuestionUseCase = require("./CreateQuestion")
const CreateVariableUseCase = require("./CreateVariable")
const DeleteVariableUseCase = require("./DeleteVariable")
const CreateConditionUseCase = require("./CreateCondition")
const DeleteConditionUseCase = require("./DeleteCondition")
const UpdateQuestionUseCase = require("./UpdateQuestion")
const GetQuestionsByOwnerUseCase = require("./GetQuestionsByOwner")

module.exports = {
  CreateQuestionUseCase,
  CreateVariableUseCase,
  DeleteVariableUseCase,
  CreateConditionUseCase,
  DeleteConditionUseCase,
  UpdateQuestionUseCase,
  GetQuestionsByOwnerUseCase,
}
