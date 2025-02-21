const { NotFoundError, HttpError } = require("../../core/errors")
const Repository = require("../../core/repository")
const toOid = require("../utils/toOid")
const ClassModel = require("./data-access/model")

module.exports = class ClassRepository extends Repository {
  constructor(model) {
    super(model)
    this.addStudentToClass = this.addStudentToClass.bind(this)
    this.dropStudentFromClass = this.dropStudentFromClass.bind(this)
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

  async dropStudentFromClass({classId, studentToDrop}){
    const klass = await ClassModel.findById(classId)
    if(!klass){
      throw new NotFoundError(`class ${classId}`)
    }
    let enrolled = false
    let alreadyDropped = false
    klass.roster.forEach(seat => {
      if(seat.student.toHexString() === studentToDrop.id){
        enrolled = true
      }
    })
    klass.droppedStudents.forEach(seat => {
      if(seat.student.toHexString() === studentToDrop.id){
        alreadyDropped = true
      }
    })
    if(alreadyDropped){
      throw new HttpError(422, 'student already dropped')
    }
    if(!enrolled){
      throw new HttpError(422, 'student not enrolled' )
    }
    klass.roster = klass.roster.filter(seat => seat.student.toHexString() !== studentToDrop.id)
    klass.droppedStudents.push({student: toOid(studentToDrop.id), dropDate: studentToDrop.dropDate})
    await klass.save()
  }
}
