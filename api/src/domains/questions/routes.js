const express = require('express')
const QuestionModel = require('./data-access/model')
const QuestionRepository = require('./repository')
const QuestionController = require('./controller')
const auth = require('../../middleware/auth')

module.exports = function questionRoutes(){
    const repository = new QuestionRepository(QuestionModel)
    const controller = new QuestionController(repository)
    const router = express.Router()

    router.use(auth)
    router.post('/', controller.create)
    router.patch('/:questionId', controller.updateQuestion)
    router.get('/owner/:ownerId', controller.getByOwner)

    router.post('/:questionId/variable', controller.createVariable)
    router.post('/:questionId/condition', controller.createCondition)

    router.delete('/:questionId/variable/:variableId', controller.deleteVariable)
    router.delete('/:questionId/condition/:conditionId', controller.deleteCondition)

    return router
} 