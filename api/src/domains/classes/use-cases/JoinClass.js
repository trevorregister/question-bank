const UseCase = require("../../../core/usecase")
const { NotFoundError, HttpError } = require("../../../core/errors.js")
const UserModel = require('../../users/data-access/model.js')
const { RosteredStudent } = require('../entities.js')
const { USER_ROLES } = require('../../../core/enums.js')

module.exports = class JoinClassUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute({ userId, joinCode }) {
    const invalidJoinCodeCharacters = /[^a-zA-Z0-9 ]/
    if(joinCode.length !== 8 || invalidJoinCodeCharacters.test(joinCode)){
      throw new HttpError(400, `${joinCode} invalid code. Join codes are 8 characters long with only letters and numbers`)
    }
    const user = await UserModel.findById(userId)
    if(!user) {
      throw new NotFoundError(`user ${owner}`)
    }
    if(user.role !== USER_ROLES.Student){
      throw new HttpError(400, `user ${userId} not a student`)
    }
    const klass = await this.repository.findByJoinCode(joinCode.trim().toLowerCase())
    if(!klass){
      throw new NotFoundError(`class with join code ${joinCode}`)
    }
    let enrolled = false
    let isDropped = false
    klass.roster.forEach(seat => {
      if(seat.student.toHexString() === userId){
        enrolled = true
      }
    })
    klass.droppedStudents.forEach(seat => {
      if(seat.student.toHexString() === userId){
        isDropped = true
      }
    })
    if(isDropped){
      throw new HttpError(422, 'student has been dropped from the class')
    }
    if(enrolled){
      throw new HttpError(422, 'student already enrolled' )
    }
    const studentToRosterProps = RosteredStudent.toDb(userId)
    const studentToRoster = new RosteredStudent(studentToRosterProps)
    return await this.repository.addStudentToClass({studentToRoster: studentToRoster, klass: klass})
  }
}
