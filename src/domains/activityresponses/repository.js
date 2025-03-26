const { NotFoundError } = require("../../core/errors")
const Repository = require("../../core/repository")

module.exports = class ActivityResponseRepository extends Repository {
  constructor(model) {
    super(model)
  }
}
