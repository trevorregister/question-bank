const CreateUserUseCase = require('./CreateUser')
const GetUserByIdUseCase = require('./GetUserById')
const UserRepository = require("../repository")
const UserModel = require('../data-access/model')

/* const model = new UserModel()
const repository = new UserRepository(model)

const findByIdCase = new GetUserByIdUseCase(repository)
const createCase = new CreateUserUseCase(repository)

const userUseCases = {
    create: async (userProps) => { return await createCase.execute(userProps) },
    findById: async (id) => { return await findByIdCase.execute(id) }
}

module.exports = userUseCases */

module.exports = {
    CreateUserUseCase,
    GetUserByIdUseCase
}