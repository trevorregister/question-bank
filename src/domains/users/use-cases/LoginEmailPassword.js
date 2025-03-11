const UseCase = require("../../../core/usecase.js")
const User = require("../entities.js")
const { HttpError, NotFoundError } = require("../../../core/errors.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = class LoginEmailPasswordUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute({ email, password }) {
    const user = await this.repository.findByEmail(email)
    if (!user) {
      throw new HttpError(401, "user not found or incorrect password")
    }
    const match = await bcrypt.compare(password, user.hash ?? "")
    if (user && match) {
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
      )
      return { id: user._id, role: user.role, token: token }
    } else {
      throw new HttpError(401, "user not found or incorrect password")
    }
  }
}
