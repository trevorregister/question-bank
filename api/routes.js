import express from 'express'

export default function Routes(){
    const router = express.Router()
    router.get('/', (req, res, next) => {
        res.status(201).send('hello')
    })
    return router
}