const UseCase = require("../../../core/usecase")
const toOid = require("../../utils/toOid")

module.exports = class DeleteQuestionUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute(id) {
    return await this.repository.findOneAndDelete({ _id: toOid(id) })
  }
}
