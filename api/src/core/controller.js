export default class Controller {
    constructor(useCases){
        this.useCases = useCases
    }

    create = async(req, res, next) => {
        try{
            const data = req.body
            const result = await this.useCases.create(data)
            res.status(201).send(result)
        } catch(err){
            next(err)
        }
    }

/*     async findById(id) {
        try{
            const { id } = req.params
            const result = await this.useCases.findById(id)
            res.status(200).send(result)
        } catch(err){
            next(err)
        }
    } */
}