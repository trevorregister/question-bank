const {
  GetUserByIdUseCase,
  CreateUserUseCase,
  LoginEmailPasswordUseCase,
} = require("../users/use-cases/index")

module.exports = class UserController {
  constructor(repository) {
    this.repository = repository
    this.findById = this.findById.bind(this)
    this.create = this.create.bind(this)
    this.loginEmailPassword = this.loginEmailPassword.bind(this)
    this.logout = this.logout.bind(this)
  }

  async findById(req, res, next) {
    try {
      const getUserByIdCase = new GetUserByIdUseCase(this.repository)
      const { userId } = req.params
      const user = await getUserByIdCase.execute(userId)
      res.status(200).send(user)
    } catch (err) {
      next(err)
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie("token").status(200).end()
    } catch (err) {
      next(err)
    }
  }

  async create(req, res, next) {
    try {
      const createUserCase = new CreateUserUseCase(this.repository)
      const data = req.body
      const result = await createUserCase.execute(data)
      res
        .status(201)
        .cookie("token", result.token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          domain: process.env.DOMAIN,
        })
        .send({ id: result.id, role: result.role })
    } catch (err) {
      next(err)
    }
  }

  async loginEmailPassword(req, res, next) {
    try {
      const loginEmailPasswordCase = new LoginEmailPasswordUseCase(
        this.repository,
      )
      const data = req.body
      const result = await loginEmailPasswordCase.execute(data)
      res
        .status(200)
        .cookie("token", result.token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          domain: process.env.DOMAIN,
        })
        .send({ id: result.id, role: result.role })
    } catch (err) {
      next(err)
    }
  }
}
