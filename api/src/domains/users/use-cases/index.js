import { CreateUserUseCase } from "./CreateUser.js"
import { GetUserByIdUseCase } from "./GetUserById.js"
import UserRepository from "../repository.js"
import UserModel from "../data-access/model.js"

const model = new UserModel()
const repository = new UserRepository(model)

const findByIdCase = new GetUserByIdUseCase(repository)
const createCase = new CreateUserUseCase(repository)
const userUseCases = {
    create: createCase,
    findById: findByIdCase
}

export default userUseCases