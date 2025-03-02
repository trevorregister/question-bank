const UseCase = require("../../../core/usecase.js")
const AssignmentResponse = require("../entities.js")
const AssignmentModel = require('../../assignments/data-access/model.js')
const { NotFoundError } = require("../../../core/errors.js")

module.exports = class SubmitResponsesToQuestions extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute({responseId, responses}) {
    const assignmentResponse = await this.repository.findById(responseId)
    const assignment = await AssignmentModel.findById(assignmentResponse.assignment)

    if (!assignmentResponse) {
      throw new NotFoundError(`response ${responseId}`)
    }
    if (!assignment) {
      throw new NotFoundError(`assignment ${assignmentResponse.assignment}`)
    }

    const activityContent = await this.repository.getActivityContent(assignment.activity.toHexString())


    if(!activityContent){
      throw new NotFoundError(`activity ${assignmentResponse.activity}`)
    }

    const questionsToCheck = activityContent.questions.map(question => responses.map(response => {
      if(response.question === question.id){
        return question
      }
    })).flat().filter(Boolean)

    let responseUpdates = []
    for(const response of responses){
      let isCorrect = false
      for (const question of questionsToCheck){
        if(question.id === response.question){
          for (const condition of question.conditions){
            if(response.content === condition.expression && condition.isCorrect === true){
              isCorrect = true
            }
          }
        }
      }
      const responseUpdate = assignmentResponse.responses.map(assignmentResponse => {
          if(response.question === assignmentResponse.question){
            const score = questionsToCheck.find(question => question.id === response.question).pointValue
            return {
              question: response.question,
              content: response.content,
              isCorrect: isCorrect,
              score: isCorrect ? score : 0
            }
          }
      }).filter(Boolean)
      responseUpdates.push(responseUpdate)
    }
    responseUpdates = responseUpdates.flat()
    assignmentResponse.responses = assignmentResponse.responses.map(assignmentResponse => {
      for(const response of responseUpdates){
        if(response.question === assignmentResponse.question){
          return response
        }
      }
      return assignmentResponse
    })
    
    const updatedAssignmentResponse = await this.repository.updateResponses({responseId: responseId, responses: assignmentResponse.responses})
    return AssignmentResponse.toWeb(updatedAssignmentResponse)
  }
}
