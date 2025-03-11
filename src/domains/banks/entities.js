const Joi = require("joi")
const Entity = require("../../core/entity.js")

const dbBank = Joi.object({
  owner: Joi.string().required(),
  name: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
})

module.exports = class Bank extends Entity {
  static validator = dbBank
  constructor({ owner, name, description = "" }) {
    super()
    this.owner = owner
    this.name = name
    this.description = description
    this.isArchived = false
    this.isDeleted = false
  }

  static toWeb(data) {
    return {
      id: data._id,
      owner: data.owner,
      description: data.description,
      name: data.name,
      isDeleted: data.isDeleted,
      isArchived: data.isArchived,
      questions: data.questions,
    }
  }
}
