export default class Controller {
    constructor(useCases){
        this.useCases = useCases
    }

    async create(req, res, next){
        try{
            const { data } = req.body
            const result = await this.useCases.create.execute(data)
            res.status(201).send(result)
        } catch(err){
            res.status(500).send(err)
        }
    }

    async findById(req, res, next){
        try{
            console.log('THIS', this.useCases)
            const { id } = req.params
            const result = await this.useCases.findById(id)
            res.status(201).send(result)
        } catch(err){
            console.log(err)
            res.status(500).send(err)
        }
    }
}