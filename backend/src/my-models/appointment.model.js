import db from '../db.js'
import { DataTypes } from 'sequelize'
import WorkerServicesModel from './worker_services.model.js'
import UserModel from './user.model.js'

const AppointmentModel = db.define('Appointment',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: { type: DataTypes.STRING },
    worker_service_id: {
      type: DataTypes.UUID,
      references: {
        model: WorkerServicesModel,
        key: 'id'
      },
      allowNull: false
    },
    client_id: {
      type: DataTypes.UUID,
      references: {
        model: UserModel,
        key: 'id'
      },
      allowNull: false
    }
  },
  {
    tableName: 'appointments',
    timestamps: true
  }
)

export default AppointmentModel