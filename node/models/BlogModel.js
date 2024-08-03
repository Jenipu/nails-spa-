// Sequelize.define}
import db_blogs from "../database/db_blogs.js";
// Importamos la conexión a db
import { DataTypes } from "sequelize";

const BlogModel = db_blogs.define('blogs', {
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING }
})

export default BlogModel