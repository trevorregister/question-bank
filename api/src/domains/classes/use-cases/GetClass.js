const UseCase = require("../../../core/usecase.js")
const { Class } = require("../entities.js")
const { NotFoundError } = require("../../../core/errors.js")

module.exports = class GetClassUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute(id) {
    const klass = await this.repository.findById(id)

    if (!klass) {
      throw new NotFoundError(`class ${id}`)
    }

    return Class.toWeb(klass)
  }
}
