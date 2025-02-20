const { NotFoundError, HttpError } = require("../../core/errors")
const Repository = require("../../core/repository")
const toOid = require("../utils/toOid")

module.exports = class ClassRepository extends Repository {
  constructor(model) {
    super(model)
    this.addStudentToClass = this.addStudentToClass.bind(this)
  }

  async addStudentToClass({joinCode, studentToRoster}){
    studentToRoster.id = toOid(studentToRoster.id)
    const klass = await this.model.findOne({joinCode: joinCode.trim().toLowerCase()})
    if(!klass){
      throw new NotFoundError(`class with join code ${joinCode}`)
    }
    let enrolled = false
    klass.roster.forEach(seat => {
      if(seat.student.toHexString() === studentToRoster.id.toHexString()){
        enrolled = true
      }
    })
    if(enrolled){
      throw new HttpError(422, 'student already enrolled' )
    }
    klass.roster.push({student: studentToRoster.id, joinDate: studentToRoster.joinDate})
    await klass.save()
    return {class: klass._id}
  }
}
