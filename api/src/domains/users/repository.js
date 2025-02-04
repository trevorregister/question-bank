import Repository from "../../core/repository.js"

export default class UserRepository extends Repository{
    constructor(model){
        super(model)
    }

    async findById(id) {
        console.log('id', id)
        return await this.model.findById(id)
    }

    findByEmail = async (email) => {
        return await this.model.findOne({email: email.toLowerCase().trim()})
    }
}