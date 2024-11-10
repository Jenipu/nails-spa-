import { DataTypes } from 'sequelize'
import db from '../db.js'
import ServiceModel from './service.model.js'

const RatingModel = db.define('Rating',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    score: {
      type: DataTypes.STRING,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    service_id: {
      type: DataTypes.UUID,
      references: {
        model: ServiceModel,
        key: 'id'
      },
      allowNull: false
    }
  },
  {
    tableName: 'ratings',
    timestamps: true
  }
)

export default RatingModel
