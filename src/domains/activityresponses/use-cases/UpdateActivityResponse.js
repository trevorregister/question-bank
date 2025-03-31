const UseCase = require("../../../core/usecase")
const ActivityResponse = require("../entities.js")
const ActivityResponseModel = require("../../activities/data-access/model.js")
const { NotFoundError } = require("../../../core/errors.js")

module.exports = class UpdateActivityResponseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute({ updatedActivityResponse }) {
    const activityResponse = await this.repository.updateActivityResponse(
      updatedActivityResponse,
    )
    return ActivityResponse.toWeb(activityResponse)
  }
}
