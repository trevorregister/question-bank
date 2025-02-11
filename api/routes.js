const express = require('express')
const userRoutes = require('./src/domains/users/routes.js')
const questionRoutes = require('./src/domains/questions/routes.js')

function Routes(){
    const router = express.Router()
    router.use('/users', userRoutes())
    router.use('/questions', questionRoutes())
    router.get('/', (req, res, next) => {
        res.status(201).send('hello')
    })
    return router
}

module.exports = Routes