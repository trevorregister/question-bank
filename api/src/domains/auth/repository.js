const UserModel = require("../users/data-access/model");
const QuestionModel = require("../questions/data-access/model");
const BankModel = require("../banks/data-access/model");
const { NotFoundError } = require("../../core/errors");
const { Question, User, Bank } = require("./subjects");

class AuthRepo {
  constructor() {}
  static async getResource({ resourceId, SubjectClass }) {
    let resource = undefined;
    switch (SubjectClass) {
      case Question:
        resource = await QuestionModel.findById(resourceId);
        break;
      case User:
        resource = await UserModel.findById(resourceId);
        break;
      case Bank:
        resource = await BankModel.findById(resourceId);
    }
    if (resource) {
      return resource;
    } else {
      throw new NotFoundError(`resource ${SubjectClass.name} ${resourceId}`);
    }
  }
}

module.exports = AuthRepo;
