const EventBus = require("../EventBus")
const EVENTS = require("../types")
const AssignmentResponseModel = require("../../domains/responses/data-access/model.js")
const toOid = require("../../domains/utils/toOid.js")

async function handleDeleteAssignment(id) {
  await AssignmentResponseModel.deleteMany({ assignment: toOid(id) })
  return
}

module.exports = EventBus.subscribe(
  EVENTS.DeleteAssignment,
  async (payload) => {
    await handleDeleteAssignment(payload)
  },
)
