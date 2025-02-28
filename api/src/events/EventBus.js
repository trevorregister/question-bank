const EventEmitter = require("events")
const Event = require("./Event.js")
const { TypeError } = require("../core/errors.js")
const { EVENTS } = require("../core/enums.js")

module.exports = class EventBus extends EventEmitter {
  static eventInstance = new EventBus()
  static publish(event) {
    if (!(event instanceof Event)) {
      throw new TypeError(`must be of type ${Event.name}`)
    }
    this.eventInstance.emit(event.name, event.payload)
  }
  static subscribe(event, callback) {
    const validEvent = Object.values(EVENTS).includes(event)
    if (!validEvent) {
      throw new TypeError(`invalid event ${event}`)
    }
    if (typeof callback !== "function") {
      throw new TypeError(
        `${callback} is ${typeof callback} but must be function `,
      )
    }
    this.eventInstance.on(event, async (payload) => {
      await callback(payload)
    })
  }
}
