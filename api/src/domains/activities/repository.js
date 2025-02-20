const { NotFoundError } = require("../../core/errors")
const Repository = require("../../core/repository")
const toOid = require("../utils/toOid")

module.exports = class ActivityRepository extends Repository {
  constructor(model) {
    super(model)
    this.updateActivity = this.updateActivity.bind(this)
    this.archiveActivity = this.archiveActivity.bind(this)
    this.unarchiveActivity = this.unarchiveActivity.bind(this)
  }

  async updateActivity(updatedActivity){
    const activity = await this.model.findById(updatedActivity.id)
    if(!activity){
      throw new NotFoundError(`activity ${updatedActivity.id}`)
    }
    Object.assign(activity, updatedActivity)
    return await activity.save()
    
  }

  async archiveActivity(id){
    return await this.model.findOneAndUpdate({_id: toOid(id)}, {$set: {isArchived: true}})
  }

  async unarchiveActivity(id){
    return await this.model.findOneAndUpdate({_id: toOid(id)}, {$set: {isArchived: false}})
  }
}
