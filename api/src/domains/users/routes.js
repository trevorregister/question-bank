const express = require('express')
const UserModel = require('../users/data-access/model')
const UserRepository = require('./repository')
const UserController = require('./controller')
const auth = require('../../middleware/auth')

module.exports = function userRoutes(){
    const repository = new UserRepository(UserModel)
    const controller = new UserController(repository)
    const router = express.Router()
    router.post('/', controller.create)
    router.post('/login/email-password', controller.loginEmailPassword)

    router.use(auth)

    router.get('/:id', controller.findById)

    return router
} 