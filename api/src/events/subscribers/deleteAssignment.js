const EventBus = require("../EventBus")
const { EVENTS } = require("../../core/enums")

function logEvent(assignmentId) {
  console.log(`Assignment ${assignmentId} deleted`)
}
module.exports = EventBus.subscribe(EVENTS.DeleteAssignment, async () => {})
