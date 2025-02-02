import UseCase from "../../../core/usecase.js"
import { User } from "../entities.js"

export class CreateUserUseCase extends UseCase {
    constructor(repository){
        super(repository)
    }

    async execute({email, firstName, lastName, role}){
        const user = new User({email, firstName, lastName, role})
        return await this.repository.create(user)
    }
}