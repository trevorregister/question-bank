const UseCase = require("../../../core/usecase")
const AssignmentResponse = require("../entities.js")
const AssignmentModel = require("../../../domains/assignments/data-access/model.js")
const { NotFoundError, HttpError } = require("../../../core/errors.js")
const { VARIABLE_TYPES } = require('../../../core/enums.js')
const generateRandomVariableValue = require('../../../domains/utils/generateRandomVariableValue.js')

module.exports = class CreateAssignmentResponseUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute({ assignmentId, owner}) {
    const assignment = await AssignmentModel.findById(assignmentId)
    if (!assignment) {
      throw new NotFoundError(`assignment ${assignmentId}`)
    }

    const activityContent = await this.repository.getActivityContent(assignment.activity)
    
    const assignmentResponseVariables = activityContent.variables.length > 0 
        ? activityContent.variables.map(variable => {
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

    const assignmentResponseQuestions = activityContent.questions.length > 0
        ? activityContent.questions.map(question => {
            return {
                question: question.id,
                content: '',
                score: 0,
                isCorrect: null
            }
        })
        : []
    const assignmentResponseProps = AssignmentResponse.toDb({ assignment: assignmentId, owner: owner, variables: assignmentResponseVariables, responses: assignmentResponseQuestions })
    const assignmentResponse = await this.repository.create(new AssignmentResponse(assignmentResponseProps))
    return AssignmentResponse.toWeb(assignmentResponse)
  }
}
