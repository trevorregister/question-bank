const UseCase = require("../../../core/usecase")
const { Activity } = require("../entities.js")
const UserModel = require("../../users/data-access/model.js")
const { NotFoundError } = require("../../../core/errors.js")
const toOid = require("../../utils/toOid.js")

module.exports = class CreateActivityUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute({ name, ownerId }) {
    const user = await UserModel.findById(ownerId)
    if (!user) {
      throw new NotFoundError(`user ${ownerId}`)
    }
    const props = Activity.toDb({ name: name, owner: ownerId })
    const activity = await this.repository.create(new Activity(props))
    return Activity.toWeb(activity)
  }
}
