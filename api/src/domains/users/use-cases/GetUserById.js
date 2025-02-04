import UseCase from "../../../core/usecase.js"
import User from "../entities.js"
import { NotFoundError } from "../../../core/errors.js"

export default class GetUserByIdUseCase extends UseCase {
    constructor(repository){
        super(repository)
    }

    async execute(id){
        console.log('id', id)
        const user = await this.repository.findById(id)
        console.log('use case', user)

        if(!user){
            throw new NotFoundError((`user ${id}`))
        }
        
        return User.toWeb(user)
    }
}