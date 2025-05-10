const UseCase = require("../../../core/usecase")
const { Activity } = require("../entities.js")
const UserModel = require("../../users/data-access/model.js")
const { NotFoundError } = require("../../../core/errors.js")
const crypto = require("crypto")

module.exports = class CreateActivityUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute({ name, ownerId, sections, tags }) {
    const user = await UserModel.findById(ownerId)
    if (!user) {
      throw new NotFoundError(`user ${ownerId}`)
    }
    const code = crypto.randomBytes(4).toString("hex")
    const props = Activity.toDb({
      name: name,
      owner: ownerId,
      sections: sections,
      tags: tags,
      code: code,
    })
    const activity = await this.repository.create(new Activity(props))
    return Activity.toWeb(activity)
  }
}
