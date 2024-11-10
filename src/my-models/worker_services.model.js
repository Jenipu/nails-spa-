import db from '../db.js'
import { DataTypes } from 'sequelize'
import UserModel from './user.model.js'
import ServiceModel from './service.model.js'

const WorkerServicesModel = db.define('worker_services',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    worker_id: {
      type: DataTypes.UUID,
      references: {
        model: UserModel,
        key: 'id'
      },
      allowNull: false
    },
    service_id: {
      type: DataTypes.UUID,
      references: {
        model: ServiceModel,
        key: 'id'
      },
      allowNull: false
    }
  }
)

export default WorkerServicesModel