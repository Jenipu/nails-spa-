import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { usersRouter, serviciosRouter, citasRouter, authRouter } from './routes/index.js'
import { ORIGIN } from './app-config.js'

const app = express()

/** Middlewares */
app.use(cors({
  origin: ORIGIN,
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev')) // Log requests in console

/** Routes */
app.use('/api', authRouter)
app.use('/api', usersRouter)
app.use('/api', serviciosRouter)
app.use('/api', citasRouter)

export default app