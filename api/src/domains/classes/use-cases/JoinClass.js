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
    const rosteredStudentProps = RosteredStudent.toDb(userId)
    const props = {joinCode: joinCode, studentToRoster: new RosteredStudent(rosteredStudentProps)}
    return await this.repository.addStudentToClass(props)
  }
}
