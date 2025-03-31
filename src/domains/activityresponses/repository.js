const { NotFoundError } = require("../../core/errors")
const Repository = require("../../core/repository")

module.exports = class ActivityResponseRepository extends Repository {
  constructor(model) {
    super(model)
    this.updateActivityResponse = this.updateActivityResponse.bind(this)
  }

  async updateActivityResponse(updatedActivityResponse) {
    const activityResponse = await this.model.findById(
      updatedActivityResponse.id,
    )
    if (!activityResponse) {
      throw new NotFoundError(`activity ${updatedActivityResponse.id}`)
    }
    Object.assign(activityResponse, updatedActivityResponse)
    return await activityResponse.save()
  }
}
