const UseCase = require("../../../core/usecase")
const ActivityResponse = require("../entities.js")
const ActivityModel = require("../../activities/data-access/model.js")
const { NotFoundError } = require("../../../core/errors.js")
const { VARIABLE_TYPES } = require("../../../core/enums.js")
const generateRandomVariableValue = require("../../../domains/utils/generateRandomVariableValue.js")

module.exports = class CreateActivityResponseUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute({ activityCode, student }) {
    const activity = await ActivityModel.findOne({
      code: activityCode.trim().toLowerCase(),
    })
    if (!activity) {
      throw new NotFoundError(`activity ${activityCode}`)
    }

    const activityVariables = activity.sections
      .map((section) =>
        section.questions.map((question) => question.variables).flat(),
      )
      .flat()
    const questions = activity.sections
      .map((section) => section.questions.map((question) => question))
      .flat()

    const activityResponseVariables =
      activityVariables.length > 0
        ? activityVariables.map((variable) => {
            let value
            switch (variable.type) {
              case VARIABLE_TYPES.Random:
                value = generateRandomVariableValue(variable)
                break
              default:
                value = undefined
            }
            if (!value) {
              throw new TypeError(`variable ${variable.type}`)
            }
            return {
              id: variable.id,
              value: value,
              label: variable.label,
            }
          })
        : []

    const activityResponses =
      questions.length > 0
        ? questions.map((question) => {
            return {
              question: question.id,
              content: "",
              score: 0,
              isCorrect: null,
            }
          })
        : []
    const activityResponseProps = ActivityResponse.toDb({
      activity: activity._id,
      teacher: activity.owner,
      student: student,
      variables: activityResponseVariables,
      responses: activityResponses,
    })
    const activityResponse = await this.repository.create(
      new ActivityResponse(activityResponseProps),
    )
    return ActivityResponse.toWeb(activityResponse)
  }
}
