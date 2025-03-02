const Repository = require("../../core/repository")
const toOid = require("../../domains/utils/toOid")

module.exports = class AssignmentRepository extends Repository {
  constructor(model) {
    super(model)
    this.findByClassId = this.findByClassId.bind(this)
    this.findResponsesForAssignment = this.findResponsesForAssignment.bind(this)
  }

  async findByClassId(classId) {
    classId = typeof classId === 'string' ? toOid(classId) : classId
    return await this.model.find({ class: classId })
  }

  async findResponsesForAssignment(assignmentId) {
    const assignment = await this.model.aggregate([
      {
        $match: {
          _id: toOid(assignmentId)
        }
      },
      {
        $lookup: {
          from: 'assignmentresponses',
          localField: '_id',
          foreignField: 'assignment',
          as: 'responses'
        }
      }
    ])
    return assignment[0].responses
  }
}
