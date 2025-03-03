const {
  CreateAssignmentUseCase,
  DeleteAssignmentUseCase,
  GetResponsesForAssignment,
} = require("./use-cases/index")

module.exports = class AssignmentController {
  constructor(repository) {
    this.repository = repository
    this.create = this.create.bind(this)
    this.delete = this.delete.bind(this)
    this.getResponsesForAssignment = this.getResponsesForAssignment.bind(this)
  }

  async create(req, res, next) {
    try {
      const createAssignmentCase = new CreateAssignmentUseCase(this.repository)
      const data = { ...req.body, owner: req.user.id }
      const result = await createAssignmentCase.execute(data)
      res.status(201).send(result)
    } catch (err) {
      next(err)
    }
  }

  async delete(req, res, next) {
    try {
      const deleteAssignmentCase = new DeleteAssignmentUseCase(this.repository)
      const { assignmentId } = req.params
      const result = await deleteAssignmentCase.execute(assignmentId)
      res.status(204).end()
    } catch (err) {
      next(err)
    }
  }

  async getResponsesForAssignment(req, res, next) {
    try {
      const getResponsesForAssignmentCase = new GetResponsesForAssignment(
        this.repository,
      )
      const { assignmentId } = req.params
      const result = await getResponsesForAssignmentCase.execute(assignmentId)
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }
}
