import { Sequelize } from 'sequelize';

const db = new Sequelize('blogs', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
})

export default db