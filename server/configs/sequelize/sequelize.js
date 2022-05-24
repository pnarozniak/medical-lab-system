const dotenv = require('dotenv');
dotenv.config();

const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    `${process.env.DB_NAME}`, `${process.env.DB_LOGIN}`, `${process.env.DB_PASS}`, {
        dialect: `${process.env.DB_DIALECT}`,
        host: `${process.env.DB_HOST}`
    }
)

module.exports = sequelize