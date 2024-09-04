import express from 'express'

import { getAllUsers, createUser } from '../controllers/UserController.js'
const routerUser = express.Router()

routerUser.get('/users', getAllUsers)
routerUser.post('/', createUser)


export default routerUser