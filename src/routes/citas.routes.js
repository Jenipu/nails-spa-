import { Router } from 'express'
import { createAppointment, deleteAppointment, getAppointment, getAppointments, updateAppointment } from '../controllers/appointments.controller.js'
import { authenticated, authorized } from '../middlewares/index.js'
import { ROLES } from '../constants/index.js'

const citasRouter = Router()

citasRouter.get('/appointments', authenticated, authorized([ROLES.ADMIN]), getAppointments)
  .get('/appointments/:id', authenticated, authorized([ROLES.ADMIN, ROLES.WORKER, ROLES.CLIENT]), getAppointment)
  .post('/appointments', authenticated, authorized([ROLES.ADMIN, ROLES.WORKER, ROLES.CLIENT]), createAppointment)
  .patch('/appointments/:id', authenticated, authorized([ROLES.ADMIN]), updateAppointment)
  .delete('/appointments:id', authenticated, authorized([ROLES.ADMIN]), deleteAppointment)

export default citasRouter