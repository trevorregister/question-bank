const { CreateActivityUseCase } = require("./use-cases/index")

module.exports = class ActivityController {
  constructor(repository) {
    this.repository = repository
    this.create = this.create.bind(this)
  }

  async create(req, res, next) {
    try {
      const createActivityCase = new CreateActivityUseCase(this.repository)
      const { name, sections = [], tags = [] } = req.body
      const data = { name: name, ownerId: req.user.id, sections: sections, tags: tags }
      const result = await createActivityCase.execute(data)
      res.status(201).send(result)
    } catch (err) {
      next(err)
    }
  }
}
