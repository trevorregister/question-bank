export default class Controller {
    constructor(useCases){
        this.useCases = useCases
    }

    create = async(req, res, next) => {
        try{
            const { data } = req.body
            const result = await this.useCases.create.execute(data)
            res.status(201).send(result)
        } catch(err){
            res.status(500).send(err)
        }
    }

    findById = async(req, res, next) => {
        try{
            const { id } = req.params
            const result = await this.useCases.findById(id)
            res.status(201).send(result)
        } catch(err){
            console.log(err)
            res.status(500).send(err)
        }
    }
}