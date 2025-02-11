const UseCase = require('../../../core/usecase.js')
const User = require('../entities.js')
const { HttpError, NotFoundError } = require('../../../core/errors.js')
const bcrypt = require('bcrypt')

module.exports = class LoginEmailPasswordUseCase extends UseCase {
    constructor(repository){
        super(repository)
    }

    async execute ({email, password}) {
        const user = await this.repository.findByEmail(email)
        
        if(!user){
            throw new HttpError(401, 'user not found or incorrect password')
        } else {
            
        const match = await bcrypt.compare(password, user.hash)
        
        if(match){
            return User.toWeb(user)
        } else {
            throw new HttpError(401, 'user not found or incorrect password')
        }
        } 
    }
}