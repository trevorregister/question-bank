import Controller from "../../core/controller.js"
import GetUserByIdUseCase from '../users/use-cases/GetUserById.js'


export default class UserController {
    constructor(repository){
        this.repository = repository
        this.findById = this.findById.bind(this)
    }

    async findById(req, res, next){
        try{
            const getUserByIdCase = new GetUserByIdUseCase(this.repository)
            const { id } = req.params
            const result = await getUserByIdCase.execute(id)
            res.status(200).send(result)
        } catch(err){
            next(err)
        }
        
    }
}