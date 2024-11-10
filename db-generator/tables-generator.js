import db from '../src/db.js'
import { logInfo, logSuccess } from '../src/libs/functions.js'
import {UserModel, ServiceModel, AppointmentModel, RatingModel } from '../src/my-models/index.js'
import WorkerServicesModel from '../src/my-models/worker_services.model.js'

export const generateTableAssociations = () => {
  try {
    UserModel.hasMany(AppointmentModel, {
      foreignKey: 'client_id',
      as: 'client'
    })

    WorkerServicesModel.belongsTo(UserModel, {
      foreignKey: "worker_id",
      as: 'worker'
    })

    WorkerServicesModel.belongsTo(ServiceModel, {
      foreignKey: "service_id",
      as: 'service'
    })

    WorkerServicesModel.hasMany(AppointmentModel, {
      foreignKey: "worker_service_id",
      // as: 'appointment_service'
      as: 'services'
    })

    RatingModel.belongsTo(ServiceModel, {
      foreignKey: 'service_id'
    })

    AppointmentModel.belongsTo(UserModel, {
      foreignKey: 'client_id',
      as: 'client'
    })

    AppointmentModel.belongsTo(WorkerServicesModel, {
      foreignKey: "worker_service_id",
      as: 'services'
    })

    logSuccess('Tables Associations were generate!.')

  } catch (error) {
    console.error(error)
    throw new Error({cause: 'Generate Associations', message: error.original.sqlMessage})
  }
}

export const syncAllTables = () => {
  return new Promise((resolve, reject) => {
    logInfo('Connecting and synchronizing tables...')

    db.sync()
      .then(() => {
        logSuccess('All tables were synchronized!.')
        resolve(true)
      })
      .catch((error) => {
        reject({cause: 'Synchronizing all tables', message: error.original.sqlMessage})
      })
      .finally(async () => {
        logInfo('Closing connection!.')
        await db.close()
        logSuccess('Connection closed!.')
      })
  })
}
