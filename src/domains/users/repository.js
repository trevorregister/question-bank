const Repository = require("../../core/repository")

module.exports = class UserRepository extends Repository {
  constructor(model) {
    super(model)
    this.findByEmail = this.findByEmail.bind(this)
  }

  async findByEmail(email) {
    return await this.model.findOne({ email: email.toLowerCase().trim() })
  }
}
