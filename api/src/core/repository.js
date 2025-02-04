module.exports = class Repository {
    constructor(model){
        this.model = model
        this.findById.bind(this)
        this.create.bind(this)
    }

    async findById(id){
        return await this.model.findById(id)
    }

    async create(data){
        return await this.model.create(data)
    }
}