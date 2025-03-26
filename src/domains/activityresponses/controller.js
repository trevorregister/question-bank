const { CreateActivityResponseUseCase } = require("./use-cases/index")

module.exports = class ActivityResponseController {
  constructor(repository) {
    this.repository = repository
    this.create = this.create.bind(this)
  }

  async create(req, res, next) {
    try {
      const createResponseCase = new CreateActivityResponseUseCase(
        this.repository,
      )
      const data = {
        activityCode: req.body.activityCode,
        student: req.body.student,
      }
      const result = await createResponseCase.execute(data)
      res.status(201).send(result)
    } catch (err) {
      next(err)
    }
  }
}
