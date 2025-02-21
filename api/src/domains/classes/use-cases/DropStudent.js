const UseCase = require("../../../core/usecase.js")
const { NotFoundError, HttpError } = require("../../../core/errors.js")
const UserModel = require("../../users/data-access/model.js")
const { DroppedStudent } = require("../entities.js")
const { USER_ROLES } = require("../../../core/enums.js")
const toOid = require("../../utils/toOid.js")

module.exports = class DropStudentUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute({ classId, studentId }) {
    const student = await UserModel.find({
      _id: toOid(studentId),
      role: USER_ROLES.Student,
    })
    if (!student) {
      throw new NotFoundError(`student ${studentId}`)
    }
    const klass = await this.repository.findById(classId)
    if (!klass) {
      throw new NotFoundError(`class ${classId}`)
    }
    let enrolled = false
    let alreadyDropped = false
    klass.roster.forEach((seat) => {
      if (seat.student.toHexString() === studentId) {
        enrolled = true
      }
    })
    klass.droppedStudents.forEach((seat) => {
      if (seat.student.toHexString() === studentId) {
        alreadyDropped = true
      }
    })
    if (alreadyDropped) {
      throw new HttpError(422, "student already dropped")
    }
    if (!enrolled) {
      throw new HttpError(422, "student not enrolled")
    }
    const studentToDropProps = DroppedStudent.toDb(studentId)
    const studentToDrop = new DroppedStudent(studentToDropProps)
    return await this.repository.dropStudentFromClass({
      studentToDrop: studentToDrop,
      klass: klass,
    })
  }
}
