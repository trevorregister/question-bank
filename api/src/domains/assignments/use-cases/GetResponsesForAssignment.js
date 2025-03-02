const UseCase = require("../../../core/usecase.js")
const AssignmentResponse = require('../../responses/entities.js')
const { NotFoundError } = require("../../../core/errors.js")

module.exports = class GetResponsesForAssignment extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute(id) {
    const assignmentResponses = await this.repository.findResponsesForAssignment(id)

    if (!assignmentResponses) {
      throw new NotFoundError(`responses for assignment ${id}`)
    }

    return assignmentResponses.map(response => AssignmentResponse.toWeb(response))
  }
}
