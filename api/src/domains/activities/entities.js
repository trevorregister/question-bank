const Joi = require("joi")
const Entity = require("../../core/entity.js")
const generateId = require("../utils/generateId")
const { ValidationError } = require("../../core/errors.js")
const { Question } = require("../../domains/questions/entities.js")
const { QUESTION_TYPES } = require("../../core/enums.js")

const dbActivityQuestion = Joi.object({
  parent: Joi.string().trim().required(),
  prompt: Joi.string().trim().required(),
  variables: Joi.array().required().default([]),
  conditions: Joi.array().required().default([]),
  pointValue: Joi.number().integer().greater(-1),
  type: Joi.string().valid(...Object.values(QUESTION_TYPES)),
})

const dbActivitySection = Joi.object({
  name: Joi.string().required(),
  id: Joi.string().required(),
  summary: Joi.string().required(),
  sectionIndex: Joi.number().integer().greater(-1),
  questions: Joi.array().items(dbActivityQuestion).required().default([]),
})

const newDbActivity = Joi.object({
  owner: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  tags: Joi.array().items(Joi.string()).required(),
  sections: Joi.array().items(dbActivitySection).required(),
})

const dbActivityUpdate = Joi.object({
  id: Joi.string().trim().required(),
  owner: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  tags: Joi.array().items(Joi.string()).required(),
  sections: Joi.array().items(dbActivitySection).required(),
  isArchived: Joi.boolean().required(),
  questionCount: Joi.number().integer().greater(-1),
})

class Activity extends Entity {
  static validator = newDbActivity
  constructor({ owner, name, sections, tags }) {
    super()
    ;(this.owner = owner),
      (this.name = name),
      (this.sections = sections),
      (this.isArchived = false),
      (this.tags = tags),
      (this.questionCount = 0)
  }

  static toWeb(data) {
    return {
      id: data._id,
      owner: data.owner,
      sections: data.sections.map((s) => ActivitySection.toWeb(s)),
      isArchived: data.isArchived,
      tags: data.tags,
      questionCount: data.questionCount,
      name: data.name,
    }
  }

  static updateToDb(data) {
    const validate = dbActivityUpdate.validate(data)
    if (validate.error) {
      throw new ValidationError(validate.error)
    } else {
      return validate.value
    }
  }
}

class ActivitySection extends Entity {
  static validator = dbActivitySection
  constructor({ name, summary, sectionIndex = 0 }) {
    super()
    this.id = generateId()
    ;(this.name = name),
      (this.questions = []),
      (this.summary = summary),
      (this.sectionIndex = sectionIndex)
  }

  static toWeb(data) {
    return {
      id: data.id,
      name: data.name,
      //questions: data.questions,
      questions: data.questions.map((q) => Question.toWeb(q)),
      summary: data.summary,
      sectionIndex: data.sectionIndex,
    }
  }
}

module.exports = {
  Activity,
  ActivitySection,
}
