// Sequelize.define}
import userdb from "../database/db.js";
// Importamos la conexión a db
import { DataTypes } from "sequelize";

const UserModel = userdb.define('users', {
    id: {type: DataTypes.INTEGER , primaryKey: true},
    apellido_materno: { type: DataTypes.STRING },
    apellido_paterno: { type: DataTypes.STRING },
    nombre: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING }
})

export default UserModel