const UseCase = require('../../../core/usecase')
const User = require('../entities.js')
const { HttpError } = require('../../../core/errors.js')

module.exports = class CreateUserUseCase extends UseCase {
    constructor(repository){
        super(repository)
    }

    async execute ({email, firstName, lastName, role}) {
        const existingUser = await this.repository.findByEmail(email)
        
        if(existingUser){
            throw new HttpError(422, `user with ${email} already exists`)
        } else {
        console.log('use case', email)
        const userProps = User.toDb({email, firstName, lastName, role})
        const user = await this.repository.create(new User(userProps))
        return User.toWeb(user)
        }
    }
}