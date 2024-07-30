// Sequelize.define}
import db from "../database/db.js";
// Importamos la conexión a db
import { DataTypes } from "sequelize";

const BlogModel = db.define('blogs', {
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING }
})

export default BlogModel