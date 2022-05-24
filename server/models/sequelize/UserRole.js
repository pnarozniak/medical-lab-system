const Sequelize = require('sequelize')
const sequelize = require('../../configs/sequelize/sequelize')

const UserRole = sequelize.define('UserRole', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
            isInt: true
        }
    },
    roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
            isInt: true
        }
    },
})

module.exports = UserRole