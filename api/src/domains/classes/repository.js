const { NotFoundError, HttpError } = require("../../core/errors")
const Repository = require("../../core/repository")
const toOid = require("../utils/toOid")

module.exports = class ClassRepository extends Repository {
  constructor(model) {
    super(model)
    this.addStudentToClass = this.addStudentToClass.bind(this)
    this.dropStudentFromClass = this.dropStudentFromClass.bind(this)
    this.findByJoinCode = this.findByJoinCode.bind(this)
  }

  async findByJoinCode(joinCode){
    return await this.model.findOne({joinCode: joinCode})
  }

  async addStudentToClass({studentToRoster, klass}){
    klass.roster.push({student: toOid(studentToRoster.student), joinDate: studentToRoster.joinDate})
    await klass.save()
    return {class: klass._id}
  }

  async dropStudentFromClass({studentToDrop, klass}){
    console.log(klass)
    klass.roster = klass.roster.filter(seat => seat.student.toHexString() !== studentToDrop.student)
    klass.droppedStudents.push({student: toOid(studentToDrop.student), dropDate: studentToDrop.dropDate})
    await klass.save()
  }
}
