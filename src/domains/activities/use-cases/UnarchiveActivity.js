const UseCase = require("../../../core/usecase.js")
const { NotFoundError } = require("../../../core/errors.js")

module.exports = class UnarchiveActivityUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute(id) {
    const activity = await this.repository.unarchiveActivity(id)
    if (!activity) {
      throw new NotFoundError(`activity ${id}`)
    }
    return activity
  }
}
