const { NotFoundError } = require("../../core/errors")
const Repository = require("../../core/repository")
const ActivityModel = require('../activities/data-access/model')
const ActivityRepository = require('../activities/repository')

module.exports = class AssignmentResponseRepository extends Repository {
  constructor(model) {
    super(model)
    this.activityModel = new ActivityModel()
    this.activityRepo = new ActivityRepository(this.activityModel)
    this.getActivityVariables = this.getActivityVariables.bind(this)
  }

  async getActivityVariables(activityId){
    const activity = await ActivityModel.findById(activityId)
    
    if(!activity){
        throw new NotFoundError(`activity ${activityId}`)
    }
    return activity.sections.map(section => section.questions.map(question => question.variables).flat()).flat()
  }
}
