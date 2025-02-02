import express from 'express'
import userRoutes from './src/domains/users/routes.js'

export default function Routes(){
    const router = express.Router()
    router.use('/users', userRoutes())
    router.get('/', (req, res, next) => {
        res.status(201).send('hello')
    })
    return router
}