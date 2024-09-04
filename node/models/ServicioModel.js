// Sequelize.define}
import db_servicios from "../database/db_servicios.js";
// Importamos la conexión a db
import { DataTypes } from "sequelize";

const ServicioModel = db_servicios.define('servicios', {
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING }
})

export default ServicioModel