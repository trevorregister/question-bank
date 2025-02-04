const express = require('express')
const UserModel = require('../users/data-access/model')
const UserRepository = require('./repository')
const UserController = require('./controller')

module.exports = function userRoutes(){
    const model = new UserModel()
    const repository = new UserRepository(model)
    const controller = new UserController(repository)
    console.log('userroutes', controller.repository)
    const router = express.Router()
    //router.post('/', controller.create)
    router.get('/:id', controller.findById)

    return router
} 