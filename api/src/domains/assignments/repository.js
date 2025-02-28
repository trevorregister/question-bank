const Repository = require("../../core/repository")
const toOid = require("../../domains/utils/toOid")

module.exports = class AssignmentRepository extends Repository {
  constructor(model) {
    super(model)
  }
}
