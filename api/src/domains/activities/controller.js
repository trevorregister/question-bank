const { CreateActivityUseCase } = require("./use-cases/index")

module.exports = class ActivityController {
  constructor(repository) {
    this.repository = repository
    this.create = this.create.bind(this)
  }

  async create(req, res, next) {
    try {
      const createActivityCase = new CreateActivityUseCase(this.repository)
      const data = { name: req.body.name, ownerId: req.user.id }
      const result = await createActivityCase.execute(data)
      res.status(201).send(result)
    } catch (err) {
      next(err)
    }
  }
}
