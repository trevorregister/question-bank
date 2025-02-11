const UseCase = require('../../../core/usecase')
const User = require('../entities.js')
const { HttpError } = require('../../../core/errors.js')
const bcrypt = require('bcrypt')

module.exports = class CreateUserUseCase extends UseCase {
    constructor(repository){
        super(repository)
    }

    async execute ({email, firstName, lastName, role, password}) {
        const existingUser = await this.repository.findByEmail(email)
        
        if(existingUser){
            throw new HttpError(422, `user with ${email} already exists`)
        } else {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const userProps = User.toDb({email, firstName, lastName, role, hash})
        const user = await this.repository.create(new User(userProps))
        return User.toWeb(user)
        }
    }
}