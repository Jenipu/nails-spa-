import express from 'express'

import { getAllAgendas, createAgenda, getAgenda, updateAgenda, deleteAgenda } from '../controllers/AgendaController.js'
const routerAgenda = express.Router()

routerAgenda.get('/agendas', getAllAgendas)
routerAgenda.post('/', createAgenda)
routerAgenda.get('/:id', getAgenda)
routerAgenda.put('/:id', updateAgenda)
routerAgenda.delete('/:id', deleteAgenda)




export default routerAgenda