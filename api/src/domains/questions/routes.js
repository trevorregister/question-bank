const express = require('express')
const QuestionModel = require('./data-access/model')
const QuestionRepository = require('./repository')
const QuestionController = require('./controller')

module.exports = function questionRoutes(){
    const model = new QuestionModel()
    const repository = new QuestionRepository(model)
    const controller = new QuestionController(repository)
    const router = express.Router()
    router.post('/', controller.create)

    return router
} 