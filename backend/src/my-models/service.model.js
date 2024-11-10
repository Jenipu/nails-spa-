import db from '../db.js'
import { DataTypes } from 'sequelize'

const ServiceModel = db.define('Service',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: { type: DataTypes.STRING },
    imageUrl: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.TINYINT,
      defaultValue: 5,
      allowNull: false
    }
  }, {
    tableName: 'services',
    timestamps: true
  }
)

export default ServiceModel