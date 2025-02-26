const EventBus = require('../EventBus')
const { EVENTS } = require('../../core/enums')

function logEvent(assignmentId) {
  console.log(`Assignment ${assignmentId} deleted`)
}
module.exports = EventBus.onEvent(EVENTS.DeleteAssignment, async (assignmentId) => logEvent(assignmentId))
