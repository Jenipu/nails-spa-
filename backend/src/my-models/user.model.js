import { DataTypes } from 'sequelize'
import db from '../db.js'
import { ROLES } from '../constants/index.js'

const UserModel = db.define('User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: { type: DataTypes.STRING },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: { type: DataTypes.STRING },
    rol: {
      type: DataTypes.ENUM,
      values: Object.values(ROLES)
    }
  },
  {
    tableName: 'users',
    timestamps: true
  }
)

export default UserModel