import UseCase from "../../../core/usecase.js"
import User from "../entities.js"
import { NotFoundError } from "../../../core/errors.js"

export default class GetUserByIdUseCase extends UseCase {
    constructor(repository){
        super(repository)
    }

    execute = async (id) =>{
        const user = await this.repository.findById(id)

        if(!user){
            throw new NotFoundError((`user ${id}`))
        }
        
        return User.toWeb(user)
    }
}