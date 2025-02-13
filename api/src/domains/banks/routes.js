const express = require('express')
const BankModel = require('./data-access/model')
const BankRepository = require('./repository')
const BankController = require('./controller')
const { Bank } = require('../auth/subjects')
const authorize = require('../../middleware/authorize')

module.exports = function bankRoutes(){
    const repository = new BankRepository(BankModel)
    const controller = new BankController(repository)
    const router = express.Router()

    router.post('/', authorize('create', Bank), controller.create)

    return router
}