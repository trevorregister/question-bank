const Joi = require("joi")
const Entity = require("../../core/entity.js")

const dbAssignmentResponse = Joi.object({
    assignment: Joi.string().required(),
    owner: Joi.string().required(),
    variables: Joi.array(),
    responses: Joi.array(),
    totalScore: Joi.number().greater(0),
})

module.exports = class AssignmentResponse extends Entity {
  static validator = dbAssignmentResponse
  constructor({ assignment, owner, variables = [], responses }) {
    super()
    this.assignment = assignment
    this.owner = owner
    this.variables = variables
    this.responses = responses
    this.totalScore = 0
  }

  static toWeb(data) {
    return {
        id: data._id,
        assignment: data.assignment,
        owner: data.owner,
        variables: data.variables,
        responses: data.responses,
        totalScore: data.totalScore,
    }
  }
}
