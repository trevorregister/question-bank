const UserModel = require("../users/data-access/model")
const QuestionModel = require("../questions/data-access/model")
const BankModel = require("../banks/data-access/model")
const ActivityModel = require("../activities/data-access/model")
const ClassModel = require('../classes/data-access/model')
const { NotFoundError, TypeError } = require("../../core/errors")
const { Question, User, Bank, Activity, Class } = require("./subjects")

class AuthRepo {
  constructor() {}
  static async getResource({ resourceId, SubjectClass }) {
    let resource = undefined
    switch (SubjectClass) {
      case Question:
        resource = await QuestionModel.findById(resourceId)
        break
      case User:
        resource = await UserModel.findById(resourceId)
        break
      case Bank:
        resource = await BankModel.findById(resourceId)
        break
      case Activity:
        resource = await ActivityModel.findById(resourceId)
        break
      case Class:
        resource = await ClassModel.findById(resourceId)
        break
      default:
        throw new TypeError(SubjectClass.name)
    }
    if (resource) {
      return resource
    } else {
      throw new NotFoundError(`resource ${SubjectClass.name} ${resourceId}`)
    }
  }
}

module.exports = AuthRepo
