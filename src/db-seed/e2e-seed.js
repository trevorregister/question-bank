const UserModel = require("../domains/users/data-access/model")
const QuestionModel = require("../domains/questions/data-access/model")
const BankModel = require("../domains/banks/data-access/model")
const ActivityModel = require("../domains/activities/data-access/model")
const ClassModel = require("../domains/classes/data-access/model")
const AssignmentModel = require("../domains/assignments/data-access/model")
const AssignmentResponseModel = require("../domains/responses/data-access/model")

module.exports = async (seed) => {
  return Promise.all([
    await UserModel.deleteMany({}),
    await BankModel.deleteMany({}),
    await QuestionModel.deleteMany({}),
    await UserModel.insertMany(seed.users ?? []),
    await QuestionModel.insertMany(seed.questions ?? []),
    await BankModel.insertMany(seed.banks ?? []),
  ])
}
