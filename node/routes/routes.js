import express from 'express'
import { getAllServicios, getServicio, createServicio, updateServicio, deleteServicio } from '../controllers/ServicioController.js'
const router = express.Router()

router.get('/servicios', getAllServicios)
router.get('/:id', getServicio)
router.post('/', createServicio)
router.put('/:id', updateServicio)
router.delete('/:id', deleteServicio)

export default router