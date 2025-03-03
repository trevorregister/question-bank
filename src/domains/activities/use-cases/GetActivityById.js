const UseCase = require("../../../core/usecase.js")
const { Activity } = require("../entities.js")
const { NotFoundError } = require("../../../core/errors.js")

module.exports = class GetActivityByIdUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute(id) {
    const activity = await this.repository.findById(id)

    if (!activity) {
      throw new NotFoundError(`activity ${id}`)
    }

    return Activity.toWeb(activity)
  }
}
