const UseCase = require("../../../core/usecase")
const User = require("../entities.js")
const Bank = require("../../banks/entities.js")
const BankModel = require("../../banks/data-access/model.js")
const { HttpError } = require("../../../core/errors.js")
const mongoose = require("mongoose")
const { USER_ROLES } = require("../../../core/enums.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = class CreateUserUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute({ email, firstName, lastName, role, password }) {
    /*     const session = await mongoose.startSession()
    session.startTransaction()
 */
    const existingUser = await this.repository.findByEmail(email)

    if (existingUser) {
      throw new HttpError(422, `user with ${email} already exists`)
    }

    try {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      const userProps = User.toDb({ email, firstName, lastName, role, hash })
      const user = await this.repository.create(new User(userProps))

      if (role === USER_ROLES.Teacher) {
        const bankProps = Bank.toDb({
          owner: user._id.toHexString(),
          name: "Personal",
        })
        const bank = await BankModel.create(new Bank(bankProps))
      }

      await session.commitTransaction()
      session.endSession()

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
      )
      return { id: user._id, role: user.role, token: token }
    } catch (err) {
      //await session.abortTransaction()
      throw new HttpError(500, "session commit error with user creation")
    }
  }
}
