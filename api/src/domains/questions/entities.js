const Joi = require("joi")
const Entity = require("../../core/entity.js")
const generateId = require("../utils/generateId.js")
const { QUESTION_TYPES } = require("../../core/enums.js")

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
  type: Joi.string().trim().lowercase(),
  min: Joi.number().required(),
  max: Joi.number().greater(Joi.ref("min")).required(),
  step: Joi.number().greater(0).required(),
})

const dbCondition = Joi.object({
  expression: Joi.string().required(),
  isCorrect: Joi.boolean().required(),
  feedback: Joi.string().required(),
})

class Question extends Entity {
  static validator = dbQuestion
  constructor({ prompt, pointValue, type, owner }) {
    super()
    ;(this.prompt = prompt),
      (this.variables = []),
      (this.conditions = []),
      (this.pointValue = pointValue),
      (this.type = type),
      (this.isArchived = false),
      (this.isDeleted = false)
    this.owner = owner
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
  constructor({ type, min, max, step }) {
    super()
    this.id = generateId()
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
    }
  }
}

class Condition extends Entity {
  static validator = dbCondition
  constructor({ expression, isCorrect, feedback }) {
    super()
    this.id = generateId()
    this.expression = expression
    ;(this.isCorrect = isCorrect), (this.feedback = feedback ?? "")
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
