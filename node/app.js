import express from 'express'
import cors from 'cors'
import db from "./database/db.js"

import blogRoutes from './routes/routes.js'
import routerUser from './routes/userRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/blogs', blogRoutes)
app.use('/users', routerUser)

try {
    await db.authenticate()
    console.log('Conexion exitosa a DBcita')
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
