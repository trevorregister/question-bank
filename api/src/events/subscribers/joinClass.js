const EventBus = require('../EventBus')
const { EVENTS } = require('../../core/enums')

module.exports = EventBus.subscribe(EVENTS.JoinClass, async () => {})
