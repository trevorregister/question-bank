const UseCase = require("../../../core/usecase")
const Assignment = require("../entities.js")
const ClassModel = require('../../../domains/classes/data-access/model.js')
const { NotFoundError, HttpError } = require("../../../core/errors.js")

module.exports = class CreateAssignmentUseCase extends UseCase {
  constructor(repository) {
    super(repository)
  }

  async execute({klass, activity, startDate, dueDate, owner }) {
    const klassLookup = await ClassModel.findById(klass)
    if(!klassLookup){
        throw new NotFoundError(`class ${klass}`)
    }
    const isStartAfterDue = new Date(startDate) > new Date(dueDate)
    if(isStartAfterDue){
        throw new HttpError(422, `due date must be after start date`)
    }
    const props = Assignment.toDb({klass, activity, startDate, dueDate, owner })
    const assignment = await this.repository.create(new Assignment(props))
    return Assignment.toWeb(assignment)
  }
}
