const Sequelize = require('sequelize')
const sequelize = require('../../configs/sequelize/sequelize')

const Role = sequelize.define('Role', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(32),
        allowNull: false,
        unique: true,
        validate: {
            len : {
                args: [2, 32],
            },
        }
    }
})

module.exports = Role