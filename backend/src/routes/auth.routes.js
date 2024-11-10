import { Router } from 'express'
import { checkSession, login, logOut, signUp } from '../controllers/auth.controller.js'
import { authenticated } from '../middlewares/index.js'

const authRouter = Router()

authRouter.post('/auth/login', login)
  .post('/auth/signup', signUp)
  .get('/auth/logout', authenticated, logOut)
  .get('/auth/validate', authenticated, checkSession)

export default authRouter