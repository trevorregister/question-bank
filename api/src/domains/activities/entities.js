const Joi = require("joi")
const Entity = require("../../core/entity.js")
const generateId = require("../utils/generateId")

const dbActivity = Joi.object({
  owner: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  tags: Joi.array().items(Joi.string()).required(),
  sections: Joi.array().required()
})

const dbSection = Joi.object({
  name: Joi.string().required(),
  summary: Joi.string().required(),
  sectionIndex: Joi.number().integer().greater(-1),
})

class Activity extends Entity {
  static validator = dbActivity
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
      sections: data.sections,
      isArchived: data.isArchived,
      tags: data.tags,
      questionCount: data.questionCount,
      name: data.name,
    }
  }
}

class ActivitySection extends Entity {
  static validator = dbSection
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
      questions: data.questions,
      summary: data.summary,
      sectionIndex: data.sectionIndex,
    }
  }
}

module.exports = {
  Activity,
  ActivitySection,
}
