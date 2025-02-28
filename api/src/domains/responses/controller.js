const {
    CreateAssignmentResponseUseCase
  } = require("./use-cases/index")
  
  module.exports = class AssignmentResponseController {
    constructor(repository) {
      this.repository = repository
      this.create = this.create.bind(this)
      this.delete = this.delete.bind(this)
    }
  
    async create(req, res, next) {
      try {
        const createResponseCase = new CreateAssignmentResponseUseCase(this.repository)
        const data = {assignmentId: req.body.assignmentId, owner: req.user.id}
        const result = await createResponseCase.execute(data)
        res.status(201).send(result)
      } catch (err) {
        next(err)
      }
    }
  
    async delete(req, res, next) {
      try {
/*         const deleteAssignmentCase = new DeleteAssignmentUseCase(this.repository)
        const { assignmentId } = req.params
        const result = await deleteAssignmentCase.execute(assignmentId) */
        res.status(204).end()
      } catch (err) {
        next(err)
      }
    }
  }
  