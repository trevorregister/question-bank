const { NotFoundError } = require("../../core/errors")
const Repository = require("../../core/repository")
const ActivityModel = require("../activities/data-access/model")
const ActivityRepository = require("../activities/repository")

module.exports = class AssignmentResponseRepository extends Repository {
  constructor(model) {
    super(model)
    this.activityModel = new ActivityModel()
    this.activityRepo = new ActivityRepository(this.activityModel)
    this.getActivityContent = this.getActivityContent.bind(this)
    this.updateResponses = this.updateResponses.bind(this)
  }

  async getActivityContent(activityId) {
    const activity = await ActivityModel.findById(activityId)

    if (!activity) {
      throw new NotFoundError(`activity ${activityId}`)
    }
    const variables = activity.sections
      .map((section) =>
        section.questions.map((question) => question.variables).flat(),
      )
      .flat()
    const questions = activity.sections
      .map((section) => section.questions.map((question) => question))
      .flat()
    return { variables: variables, questions: questions }
  }

  async updateResponses({ responseId, responses }) {
    const assignmentResponse = await this.model.findById(responseId)
    assignmentResponse.responses = responses
    assignmentResponse.totalScore = responses.reduce(
      (acc, response) => acc + response.score,
      0,
    )
    return await assignmentResponse.save()
  }
}
