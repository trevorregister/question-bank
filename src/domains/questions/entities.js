const Joi = require("joi")
const Entity = require("../../core/entity.js")
const generateId = require("../utils/generateId.js")
const { QUESTION_TYPES, VARIABLE_TYPES } = require("../../core/enums.js")

const dbQuestion = Joi.object({
  prompt: Joi.string().required(),
  variables: Joi.array(),
  conditions: Joi.array(),
  pointValue: Joi.number().integer().required(),
  type: Joi.string()
    .required()
    .valid(...Object.values(QUESTION_TYPES)),
  owner: Joi.string().required(),
})

const dbVariable = Joi.object({
  id: Joi.string().trim().required(),
  type: Joi.string()
    .required()
    .valid(...Object.values(VARIABLE_TYPES)),
  min: Joi.number().required(),
  max: Joi.number().greater(Joi.ref("min")).required(),
  step: Joi.number().greater(0).required(),
  label: Joi.string().required(),
})

const dbCondition = Joi.object({
  id: Joi.string().trim().required(),
  expression: Joi.string().required(),
  isCorrect: Joi.boolean().required(),
  feedback: Joi.string().required(),
})

class Question extends Entity {
  static validator = dbQuestion
  constructor({
    prompt,
    pointValue,
    type,
    owner,
    variables = [],
    conditions = [],
  }) {
    super()
    this.prompt = prompt
    this.variables = variables.map((v) => new Variable(Variable.toDb(v)))
    this.conditions = conditions.map((c) => new Condition(Condition.toDb(c)))
    this.pointValue = pointValue
    this.type = type
    this.owner = owner
    this.isArchived = false
    this.isDeleted = false
  }

  static toWeb(data) {
    return {
      id: data._id,
      parent: data.parent,
      prompt: data.prompt,
      variables: data.variables.map((v) => Variable.toWeb(v)),
      conditions: data.conditions.map((c) => Condition.toWeb(c)),
      pointValue: data.pointValue,
      owner: data.owner,
      type: data.type,
      isArchived: data.isArchived,
      isDeleted: data.isDeleted,
    }
  }
}
class Variable extends Entity {
  static validator = dbVariable
  constructor({ id, label, type, min, max, step }) {
    super()
    this.id = id
    this.label = label
    this.type = type
    this.min = min
    this.max = max
    this.step = step
  }

  static toWeb(data) {
    return {
      id: data.id,
      type: data.type,
      min: data.min,
      max: data.max,
      step: data.step,
      label: data.label,
    }
  }
}

class Condition extends Entity {
  static validator = dbCondition
  constructor({ id, expression, isCorrect, feedback = "" }) {
    super()
    this.id = id
    this.expression = expression
    this.isCorrect = isCorrect
    this.feedback = feedback
  }

  static toWeb(data) {
    return {
      id: data.id,
      expression: data.expression,
      isCorrect: data.isCorrect,
      feedback: data.feedback,
    }
  }
}

module.exports = {
  Question,
  Variable,
  Condition,
}
