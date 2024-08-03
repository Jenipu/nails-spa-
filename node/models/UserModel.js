// Sequelize.define}
import db_usuarios from "../database/db_usuarios.js";
// Importamos la conexión a db
import { DataTypes } from "sequelize";

const UserModel = db_usuarios.define('users', {
    id: {type: DataTypes.INTEGER , primaryKey: true},
    apellido_materno: { type: DataTypes.STRING },
    apellido_paterno: { type: DataTypes.STRING },
    nombre: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING }
})

export default UserModel