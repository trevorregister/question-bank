const toOid = require("../domains/utils/toOid");

module.exports = class Repository {
  constructor(model) {
    this.model = model;
    this.findById = this.findById.bind(this);
    this.create = this.create.bind(this);
    this.findAllByOwner = this.findAllByOwner.bind(this);
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async findAllByOwner(ownerId) {
    return await this.model.find({ owner: toOid(ownerId) });
  }

  async create(data) {
    return await this.model.create(data);
  }
};
