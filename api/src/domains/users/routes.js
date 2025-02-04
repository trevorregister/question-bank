import express from 'express'
import UserController from './controller.js'
import UserRepository from './repository.js'
import UserModel from './data-access/model.js'

export default function userRoutes(){
    const model = new UserModel()
    const repository = new UserRepository(model)
    const controller = new UserController(repository)
    const router = express.Router()
    //router.post('/', controller.create)
    router.get('/:id', controller.findById)

    return router
} 