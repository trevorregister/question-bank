const UseCase = require("../../../core/usecase")
const { NotFoundError } = require("../../../core/errors.js")
const EventBus = require("../../../events/EventBus.js")
const Event = require("../../../events/Event.js")
const { EVENTS } = require("../../../core/enums.js")

module.exports = class DeleteAssignmentUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute(assignmentId) {
    const assignment = await this.repository.delete(assignmentId)
    if (assignment) {
      const assignmentDeletedEvent = new Event(
        EVENTS.DeleteAssignment,
        assignmentId,
      )
      EventBus.publish(assignmentDeletedEvent)
    } else {
      throw new NotFoundError(`assignment ${assignmentId}`)
    }
    return assignment
  }
}
