const UseCase = require("../../../core/usecase")
const { Activity } = require("../entities.js")
const { NotFoundError } = require("../../../core/errors.js")
const toOid = require("../../utils/toOid.js")

module.exports = class UpdateActivityUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute(updatedActivity) {
    const props = Activity.updateToDb(updatedActivity)
    const activity = await this.repository.updateActivity(props)
    return Activity.toWeb(activity)
  }
}
