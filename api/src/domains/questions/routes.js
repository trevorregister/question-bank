const express = require('express')
const QuestionModel = require('./data-access/model')
const QuestionRepository = require('./repository')
const QuestionController = require('./controller')
const authenticate = require('../../middleware/authenticate')
const authorize = require('../../middleware/authorize')
const { Question } = require('../auth/subjects')

module.exports = function questionRoutes(){
    const repository = new QuestionRepository(QuestionModel)
    const controller = new QuestionController(repository)
    const router = express.Router()

    router.use(authenticate)
    router.post('/', authorize('create', Question), controller.create)

    router.patch('/:questionId', authorize('update', Question), controller.updateQuestion)
    router.delete('/:questionId/variable/:variableId', authorize('update', Question), controller.deleteVariable)
    router.delete('/:questionId/condition/:conditionId', authorize('update', Question), controller.deleteCondition)
    router.post('/:questionId/variable', authorize('update', Question), controller.createVariable)
    router.post('/:questionId/condition', authorize('update', Question), controller.createCondition)


    router.get('/owner/:ownerId', authorize('read', Question,  (req) => ({ owner: req.params.ownerId })) ,controller.getByOwner)


    return router
} 