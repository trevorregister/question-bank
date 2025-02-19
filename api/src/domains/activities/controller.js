const { CreateActivityUseCase, UpdateActivityUseCase, GetActivityByIdUseCase, ArchiveActivityUseCase, UnarchiveActivityUseCase } = require("./use-cases/index")

module.exports = class ActivityController {
  constructor(repository) {
    this.repository = repository
    this.create = this.create.bind(this)
    this.updateActivity = this.updateActivity.bind(this)
    this.getActivityById = this.getActivityById.bind(this)
    this.archiveActivity = this.archiveActivity.bind(this)
    this.unarchiveActivity = this.unarchiveActivity.bind(this)
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

  async getActivityById(req, res, next){
    try {
      const getActivityByIdCase = new GetActivityByIdUseCase(this.repository)
      const { activityId } = req.params
      const result = await getActivityByIdCase.execute(activityId)
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  async updateActivity(req, res, next){
    try {
      const updateActivityCase = new UpdateActivityUseCase(this.repository)
      const updatedActivity  = req.body
/*       const { activityId } = req.params
      updatedActivity.id = activityId */
      const result = await updateActivityCase.execute(updatedActivity)
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  async archiveActivity(req, res, next){
    try{
      const archiveActivityCase = new ArchiveActivityUseCase(this.repository)
      const { activityId } = req.params
      const result = await archiveActivityCase.execute(activityId)
      res.status(204).send("success")
    } catch(err){
      next(err)
    }
  }

  async unarchiveActivity(req, res, next){
    try{
      const unarchiveActivityCase = new UnarchiveActivityUseCase(this.repository)
      const { activityId } = req.params
      const result = await unarchiveActivityCase.execute(activityId)
      res.status(204).send("success")
    } catch(err){
      next(err)
    }
  }
}
