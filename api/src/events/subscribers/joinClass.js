const EventBus = require("../EventBus")
const EVENTS = require("../types")
const AssignmentModel = require("../../domains/assignments/data-access/model.js")
const AssignmentRepository = require("../../domains/assignments/repository.js")
const AssignmentResponseModel = require("../../domains/responses/data-access/model.js")
const AssignmentResponseRepository = require("../../domains/responses/repository.js")
const {
  CreateAssignmentResponseUseCase,
} = require("../../domains/responses/use-cases/index")

async function handleJoinClass({ classId, studentId }) {
  const assignmentRepo = new AssignmentRepository(AssignmentModel)
  const assignments = await assignmentRepo.findByClassId(classId)
  if (!assignments) {
    return
  }
  const responseRepo = new AssignmentResponseRepository(AssignmentResponseModel)
  const createResponseCase = new CreateAssignmentResponseUseCase(responseRepo)
  assignments.forEach(async (assignment) => {
    const responseCheck = await responseRepo.findOne({
      assignment: assignment._id,
      owner: studentId,
    })
    if (responseCheck) {
      return
    }
    await createResponseCase.execute({
      assignmentId: assignment._id.toHexString(),
      owner: studentId,
    })
  })
}

module.exports = EventBus.subscribe(EVENTS.JoinClass, async (payload) => {
  await handleJoinClass(payload)
})
