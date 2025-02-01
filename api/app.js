import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import "dotenv/config"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import Routes from './routes.js'

const app = express()
const corsOptions = {
    //origin: process.env.WEB_HOST,
    credentials: true
}

app.use(helmet())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use('/api', Routes())
//app.use(errorHandler)

export default app
