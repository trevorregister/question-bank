const Repository = require('../../core/repository')

module.exports = class UserRepository extends Repository{
    constructor(model){
        super(model)
    }

    findByEmail = async (email) => {
        return await this.model.findOne({email: email.toLowerCase().trim()})
    }
}