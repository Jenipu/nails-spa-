import express from 'express'
import cors from 'cors'
import db_servicios from "./database/db_servicios.js"
import db_usuarios from "./database/db_usuarios.js"
import db_agendas from "./database/db_agendas.js"

import servicioRoute from './routes/routes.js'
import routerUser from './routes/userRoutes.js'
import routerAgenda from './routes/agendaRoutes.js'


const app = express()

app.use(cors())
app.use(express.json())
app.use('/servicios', servicioRoute)
app.use('/users', routerUser)
app.use('/agendas', routerAgenda)
app.get('/servicios', servicioRoute)
app.get('/users', routerUser)
app.get('/agendas', routerAgenda)

try {
    await db_servicios.authenticate()
    console.log('Conexion exitosa a DB servicios')
}
catch (error) {
    console.log(`El error de la conexión es : ${error}`)
}

try {
    await db_usuarios.authenticate()
    console.log('Conexion exitosa a DB usuarios')
}
catch (error) {
    console.log(`El error de la conexión es : ${error}`)
}
try {
    await db_agendas.authenticate()
    console.log('Conexion exitosa a DB usuarios')
}
catch (error) {
    console.log(`El error de la conexión es : ${error}`)
}
// app.get('/', (req, res) => {
//     res.send('Holis mundo')
// })

app.listen(8000, () => {
    console.log('server UP running on http://localhost:8000/')
})

export default app
