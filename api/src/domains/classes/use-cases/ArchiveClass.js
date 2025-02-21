const { HttpError } = require("../../../core/errors")
const UseCase = require("../../../core/usecase")

module.exports = class ArchiveClassUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute(classId) {
    const klass = await this.repository.findById(classId)
    if (klass.isArchived) {
      throw new HttpError(422, `class ${classId} already archived`)
    } else {
      return await this.repository.toggleArchive(classId)
    }
  }
}
