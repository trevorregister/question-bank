import express from 'express'
import UserController from './controller.js'
import userUseCases from './use-cases/index.js'

export default function userRoutes(){
    const controller = new UserController(userUseCases)
    const router = express.Router()
    router.post('/', controller.create)
    router.get('/:id', controller.findById)

    return router
} 