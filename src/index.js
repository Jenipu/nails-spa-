import { API_PORT } from './app-config.js'
import db from './db.js'
import app from './app.js'
import { logError, logSuccess } from './libs/functions.js'
import { generateTableAssociations } from '../db-generator/tables-generator.js'

try {
  await db.authenticate()
  generateTableAssociations()
  logSuccess('DB connection has been established successfully!');
} catch (error) {
  console.error(error)
  logError('Unable to connect to the database.');
  throw new Error('Unable to connect to the database.')
}

app.listen(API_PORT, () => {
  logSuccess(`Server listening on port: ${API_PORT.blue}!`)
})
