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
    router.patch('/:questionId', controller.updateQuestion)

    router.post('/:questionId/variable', controller.createVariable)
    router.post('/:questionId/condition', controller.createCondition)

    router.delete('/:questionId/variable/:variableId', controller.deleteVariable)
    router.delete('/:questionId/condition/:conditionId', controller.deleteCondition)

    return router
} 