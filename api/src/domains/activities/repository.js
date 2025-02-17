const { NotFoundError } = require("../../core/errors")
const Repository = require("../../core/repository")
const toOid = require("../utils/toOid")

module.exports = class ActivityRepository extends Repository {
  constructor(model) {
    super(model)
  }
}
