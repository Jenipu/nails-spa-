import { Router } from 'express'
import { createService, createServiceRating, deleteService, getService, getServices, getServicesAppointments, updateService } from '../controllers/services.controller.js'
import { authenticated, authorized } from '../middlewares/index.js'
import { ROLES } from '../constants/index.js'

const serviciosRouter = Router()

serviciosRouter.get('/services', getServices)
  .get('/services/for-appointment', getServicesAppointments)
  .get('/services/:id', getService)
  .post('/services', authenticated, authorized([ROLES.ADMIN]), createService)
  .post('/services/:id/ratings', createServiceRating)
  .patch('/services/:id', authenticated, authorized([ROLES.ADMIN]), updateService)
  .delete('/services/:id', authenticated, authorized([ROLES.ADMIN]), deleteService)

export default serviciosRouter