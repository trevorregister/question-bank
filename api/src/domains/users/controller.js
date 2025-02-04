const {
    GetUserByIdUseCase,
    CreateUserUseCase
} = require('../users/use-cases/index')

module.exports = class UserController {
    constructor(repository){
        this.repository = repository
        this.findById = this.findById.bind(this)
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
}