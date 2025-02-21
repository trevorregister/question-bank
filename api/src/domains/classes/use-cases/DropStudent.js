const UseCase = require("../../../core/usecase.js")
const { NotFoundError, HttpError } = require("../../../core/errors.js")
const UserModel = require('../../users/data-access/model.js')
const { DroppedStudent } = require('../entities.js')
const { USER_ROLES } = require('../../../core/enums.js')
const toOid = require("../../utils/toOid.js")

module.exports = class DropStudentUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute({ classId, studentId }) {
    const student = await UserModel.find({_id: toOid(studentId), role: USER_ROLES.Student})
    if(!student){
      throw new NotFoundError(`student ${studentId}`)
    }
    const droppedStudentProps = DroppedStudent.toDb(studentId)
    const data = {classId: classId, studentToDrop: new DroppedStudent(droppedStudentProps)}
    return await this.repository.dropStudentFromClass(data)
  }
}
