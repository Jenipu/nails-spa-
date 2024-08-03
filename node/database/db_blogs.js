import { Sequelize } from 'sequelize';


const db_blogs = new Sequelize('blogs', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
})

export default db_blogs