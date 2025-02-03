import UseCase from "../../../core/usecase.js"
import { User } from "../entities.js"
import { HttpError } from "../../../core/errors.js"

export default class CreateUserUseCase extends UseCase {
    constructor(repository){
        super(repository)
    }

    execute = async ({email, firstName, lastName, role}) =>{
        const existingUser = await this.repository.findByEmail(email)
        
        if(existingUser){
            throw new HttpError(422, `user with ${email} already exists`)
        } else {

        const user = new User({email, firstName, lastName, role})
        return await this.repository.create(user)
        }
    }
}