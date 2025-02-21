const UseCase = require("../../../core/usecase")
const { Class } = require("../entities.js")

module.exports = class GetMyClassesUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute(ownerId) {
    const classes = await this.repository.findAllByOwner(ownerId)
    return classes.map((c) => Class.toWeb(c))
  }
}
