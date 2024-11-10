import { logError } from '../src/libs/functions.js'
import { generateTableAssociations, syncAllTables } from './tables-generator.js'

async function dbGenerator() {
  try {
    generateTableAssociations()
    await syncAllTables()

  } catch (error) {
    console.error('this: ', error)
    logError(`${"[DB Generator] Error".red}: ${JSON.stringify(error)}`)
  }
}

dbGenerator()