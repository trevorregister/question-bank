const UseCase = require("../../../core/usecase")
const { HttpError } = require("../../../core/errors")

module.exports = class UnarchiveClassUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute(classId) {
    const klass = await this.repository.findById(classId)
    if (!klass.isArchived) {
      throw new HttpError(422, `class ${classId} already unarchived`)
    } else {
      return await this.repository.toggleArchive(classId)
    }
  }
}
