const express = require('express')
const UserController = require('./controller')
const userUseCases  = require('./use-cases/index')

module.exports = function userRoutes(){
    const controller = new UserController(userUseCases)
    const router = express.Router()
    router.post('/', controller.create)
    router.get('/:id', controller.findById)

    return router
} 