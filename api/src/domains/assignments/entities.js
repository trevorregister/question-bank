const Joi = require("joi")
const Entity = require("../../core/entity.js")

const dbAssignment = Joi.object({
  klass: Joi.string().trim().required(),
  activity: Joi.string().trim().required(),
  owner: Joi.string().trim().required(),
  startDate: Joi.date(),
  dueDate: Joi.date()
})

module.exports = class Assignment extends Entity {
  static validator = dbAssignment
  constructor({klass, activity, startDate, dueDate, owner }) {
    super()
    this.class = klass,
    this.activity = activity,
    this.startDate = startDate,
    this.dueDate = dueDate,
    this.owner = owner
  }

  static toWeb(data) {
    return {
      id: data._id,
      activity: data.activity,
      class: data.class,
      owner: data.owner,
      startDate: data.startDate,
      dueDate: data.dueDate,

    }
  }
}
