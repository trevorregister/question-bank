const express = require('express')
const userRoutes = require('./src/domains/users/routes.js')

function Routes(){
    const router = express.Router()
    router.use('/users', userRoutes())
    router.get('/', (req, res, next) => {
        res.status(201).send('hello')
    })
    return router
}

module.exports = Routes