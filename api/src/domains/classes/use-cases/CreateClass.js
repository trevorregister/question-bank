const UseCase = require("../../../core/usecase")
const { NotFoundError } = require("../../../core/errors.js")
const UserModel = require('../../users/data-access/model.js')
const { Class } = require('../entities.js')

module.exports = class CreateClassUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute({ name, owner }) {
    const teacher = UserModel.findById(owner)
    if(!teacher) {
      throw new NotFoundError(`user ${owner}`)
    }
    const props = Class.toDb({name: name, owner: owner})
    return await this.repository.create(new Class(props))
  }
}
