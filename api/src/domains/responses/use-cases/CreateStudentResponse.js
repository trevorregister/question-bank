const UseCase = require("../../../core/usecase")
const AssignmentResponse = require("../entities.js")
const AssignmentModel = require("../../../domains/assignments/data-access/model.js")
const { NotFoundError, HttpError } = require("../../../core/errors.js")
const { VARIABLE_TYPES } = require('../../../core/enums.js')

function generateRandomVariableValue({min, max, step}){
    const range = (max - min) / step
    const randomStep = Math.floor(Math.random() * (range + 1))
    const randomNumber = min + randomStep * step
    const decimalPlaces = (step.toString().split('.')[1] || '').length
    return parseFloat(randomNumber.toFixed(decimalPlaces))
}

module.exports = class CreateAssignmentResponseUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute({ assignmentId, owner}) {
    const assignment = await AssignmentModel.findById(assignmentId)
    if (!assignment) {
      throw new NotFoundError(`assignment ${assignmentId}`)
    }

    const activityVariables = await this.repository.getActivityVariables(assignment.activity)
    const assignmentResponseVariables = activityVariables.length > 0 
        ? activityVariables.map(variable => {
            let value
            switch(variable.type){
                case VARIABLE_TYPES.Random:
                    value = generateRandomVariableValue(variable)
                    break
                default:
                    value = undefined
            }
            if(!value){
                throw new TypeError(`variable ${variable.type}`)
            }
            return {
                id: variable.id,
                value: value,
                label: variable.label
            }
        })
        : []
    const assignmentResponseProps = AssignmentResponse.toDb({ assignment: assignmentId, owner, variables: assignmentResponseVariables })
    const assignmentResponse = await this.repository.create(new AssignmentResponse(assignmentResponseProps))
    return AssignmentResponse.toWeb(assignmentResponse)
  }
}
