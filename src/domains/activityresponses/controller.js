const {
  CreateActivityResponseUseCase,
  UpdateActivityResponseCase,
} = require("./use-cases/index")

module.exports = class ActivityResponseController {
  constructor(repository) {
    this.repository = repository
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
  }

  async create(req, res, next) {
    try {
      const createResponseCase = new CreateActivityResponseUseCase(
        this.repository,
      )
      const data = {
        activityCode: req.query.activityCode,
        student: req.body.student,
      }
      const result = await createResponseCase.execute(data)
      res.status(201).send(result)
    } catch (err) {
      next(err)
    }
  }

  async update(req, res, next) {
    try {
      const updateResponseCase = new UpdateActivityResponseCase(this.repository)
      const { updatedActivityResponse } = req.body
      const result = await updateResponseCase.execute(updatedActivityResponse)
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }
}
