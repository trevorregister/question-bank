const Repository = require("../../core/repository")
const toOid = require("../../domains/utils/toOid")

module.exports = class AssignmentRepository extends Repository {
  constructor(model) {
    super(model)
    this.findByClassId = this.findByClassId.bind(this)
  }

  async findByClassId(classId) {
    classId = typeof classId === 'string' ? toOid(classId) : classId
    return await this.model.find({ class: classId })
  }
}
