module.exports = class Repository {
    constructor(model){
        this.model = model
    }

    findById = async (id) => {
        return await this.model.findById(id)
    }

    create = async (data) =>{
        return await this.model.create(data)
    }
}