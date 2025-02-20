const Repository = require("../../core/repository")

module.exports = class ClassRepository extends Repository {
  constructor(model) {
    super(model)
  }
}
