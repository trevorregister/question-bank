const UseCase = require("../../../core/usecase.js")
const AssignmentResponse = require("../entities.js")
const { NotFoundError } = require("../../../core/errors.js")

module.exports = class GetResponseForStudent extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute(id) {
    const assignmentResponse = await this.repository.findById(id)

    if (!assignmentResponse) {
      throw new NotFoundError(`response ${id}`)
    }

    return AssignmentResponse.toWeb(assignmentResponse)
  }
}
