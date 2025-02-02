export default class Repository {
    constructor(model){
        this.model = model
    }

    async findById(id){
        /* return await this.model.findById(id) */
        console.log(id)
        return
    }

    async create(data){
        return await this.model.create(data)
    }
}