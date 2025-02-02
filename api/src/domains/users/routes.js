import express from 'express'
import UserController from './controller.js'
import UserRepository from './repository.js'
import UserModel from './data-access/model.js'
import userUseCases from './use-cases/index.js'

export default function userRoutes(){
    const model = new UserModel()
    const repository = new UserRepository(model)
    console.log(userUseCases.findById.repository.model)
    const controller = new UserController(userUseCases)
    const router = express.Router()
    router.post('/', controller.create)
    router.get('/:id', controller.findById)

    return router
} 