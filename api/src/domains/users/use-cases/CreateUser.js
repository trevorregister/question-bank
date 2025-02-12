const UseCase = require('../../../core/usecase')
const User = require('../entities.js')
const { HttpError } = require('../../../core/errors.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
        if(user){
            const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET)
            return {token: token }
        }else {
            throw new HttpError(500, 'user not created')
        }
        }
    }
}