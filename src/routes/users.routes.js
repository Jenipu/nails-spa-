import { Router } from 'express'
import { getUsers, createUser, getUser, updateUser, deleteUser, getUserAppointments } from '../controllers/users.controller.js'
import { authenticated, authorized } from '../middlewares/index.js'
import { ROLES } from '../constants/index.js'

const usersRouter = Router()

usersRouter.get('/users', authenticated, authorized([ROLES.ADMIN]), getUsers)
  .get('/users/:id', authenticated, authorized([ROLES.ADMIN, ROLES.WORKER, ROLES.CLIENT]), getUser)
  .get('/users/:id/appointments', authenticated, getUserAppointments)
  .post('/users', authenticated, authorized([ROLES.ADMIN]), createUser)
  .patch('/users/:id', authenticated, authorized([ROLES.ADMIN]), updateUser)
  .delete('/users/:id', authenticated, authorized([ROLES.ADMIN]), (req, res, next) => {
    req.deleteAccount = true
    next()
  }, deleteUser)


export default usersRouter