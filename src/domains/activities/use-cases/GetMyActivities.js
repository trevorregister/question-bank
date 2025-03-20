const UseCase = require("../../../core/usecase.js")
const { Activity } = require("../entities.js")

module.exports = class GetMyActivitiesUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute(ownerId) {
    const activities = await this.repository.findAllByOwner(ownerId)

    return activities.map((a) => Activity.toWeb(a))
  }
}
