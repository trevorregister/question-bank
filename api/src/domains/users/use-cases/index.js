import CreateUserUseCase from "./CreateUser.js"
import GetUserByIdUseCase from "./GetUserById.js"
import UserRepository from "../repository.js"
import UserModel from "../data-access/model.js"

const model = new UserModel()
const repository = new UserRepository(model)

const findByIdCase = new GetUserByIdUseCase(repository)
const createCase = new CreateUserUseCase(repository)

const userUseCases = {
    create: async (userProps) => { return await createCase.execute(userProps) },
    findById: async (id) => { return await findByIdCase.execute(id) }
}

export default userUseCases