module.exports = class Controller {
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

    findById = async(req, res, next) => {
        try{
            const { id } = req.params
            console.log('controller', id, this.useCases.findById)
            const result = await this.useCases.findById(id)
            res.status(200).send(result)
        } catch(err){
            next(err)
        }
    }
}