import express from 'express'
import { getAllUsers } from '../controllers/UserController.js'


const routerUser = express.Router()

routerUser.get('/', getAllUsers)

export default  routerUser