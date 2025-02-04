export default class Repository {
    constructor(model){
        this.model = model
        this.findById.bind(this)
    }

    async findById(id) {
        console.log('id', id)
        return await this.model.findById(id)
    }

    create = async (data) =>{
        return await this.model.create(data)
    }
}