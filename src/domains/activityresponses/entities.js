const Joi = require("joi")
const Entity = require("../../core/entity.js")

const dbActivityResponseVariable = Joi.object({
  id: Joi.string().required(),
  value: Joi.number().required(),
  label: Joi.string().required(),
})

const dbActivityResponseResponse = Joi.object({
  question: Joi.required(),
  content: Joi.string().allow("").required(),
  score: Joi.number().required(),
  isCorrect: Joi.boolean().allow(null).required(),
})

const dbActivityResponse = Joi.object({
  activity: Joi.required(),
  teacher: Joi.required(),
  student: Joi.string().required(),
  variables: Joi.array().items(dbActivityResponseVariable),
  responses: Joi.array().items(dbActivityResponseResponse),
  totalScore: Joi.number(),
})

module.exports = class ActivityResponse extends Entity {
  static validator = dbActivityResponse
  constructor({ activity, teacher, student, variables, responses = [] }) {
    super()
    this.activity = activity
    this.teacher = teacher
    this.student = student
    ;(this.totalScore = 0), (this.variables = variables)
    this.responses = responses
  }

  static toWeb(data) {
    return {
      id: data._id,
      activity: data.activity,
      teacher: data.teacher,
      student: data.student,
      totalScore: data.totalScore,
      variables: data.variables,
      responses: data.responses,
    }
  }
}
