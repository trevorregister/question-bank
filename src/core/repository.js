const toOid = require("../domains/utils/toOid")

module.exports = class Repository {
  constructor(model) {
    this.model = model
    this.findById = this.findById.bind(this)
    this.create = this.create.bind(this)
    this.findAllByOwner = this.findAllByOwner.bind(this)
    this.delete = this.delete.bind(this)
    this.find = this.find.bind(this)
    this.findOne = this.findOne.bind(this)
    this.findOneAndDelete = this.findOneAndDelete.bind(this)
  }

  async findById(id) {
    return await this.model.findById(id)
  }

  async findAllByOwner(ownerId) {
    return await this.model.find({ owner: toOid(ownerId) })
  }

  async create(data) {
    return await this.model.create(data)
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id)
  }

  async find(query) {
    return await this.model.find(query)
  }

  async findOne(query) {
    return await this.model.findOne(query)
  }

  async findOneAndDelete(query) {
    return await this.model.findOneAndDelete(query)
  }
}
