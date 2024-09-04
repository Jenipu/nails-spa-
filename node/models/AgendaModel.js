// Sequelize.define}
import db_agendas from "../database/db_agendas.js";
// Importamos la conexión a db
import { DataTypes } from "sequelize";

const AgendaModel = db_agendas.define('agendas', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    servicio: { type: DataTypes.CHAR },
    manicurista: { type: DataTypes.CHAR },
    fecha_hora: { type: DataTypes.DATE },
    createdAt: { type: DataTypes.CHAR },
    updatedAt: { type: DataTypes.DATE }
})

export default AgendaModel