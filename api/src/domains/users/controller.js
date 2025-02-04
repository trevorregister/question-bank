const {
    GetUserByIdUseCase,
    CreateUserUseCase
} = require('../users/use-cases/index')

module.exports = class UserController {
    constructor(repository){
        this.repository = repository
        this.findById = this.findById.bind(this)
        this.create = this.create.bind(this)
    }

    async findById(req, res, next){
        try {
            const getUserByIdCase = new GetUserByIdUseCase(this.repository)
            const { id } = req.params
            const user = await getUserByIdCase.execute(id)
            res.status(200).send(user)
        } catch (err) {
            next(err)
        }
    }

    async create(req, res, next){
        try{
            const createUserCase = new CreateUserUseCase(this.repository)
            const data = req.body
            const result = await createUserCase.execute(data)
            res.status(201).send(result)
        } catch(err){
            next(err)
        }
    }
}