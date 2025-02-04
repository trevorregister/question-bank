const UseCase = require('../../../core/usecase.js')
const User = require('../entities.js')
const { NotFoundError } = require('../../../core/errors.js')

module.exports = class GetUserByIdUseCase extends UseCase {
    constructor(repository){
        super(repository)
        this.execute.bind(this)
        console.log('usecase constructor', this.repository)

    }

    async execute(id){
        const user = await this.repository.findById(id)

        if(!user){
            throw new NotFoundError((`user ${id}`))
        }
        
        return User.toWeb(user)
    }
}