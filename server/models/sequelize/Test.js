const Sequelize = require('sequelize')
const sequelize = require('../../configs/sequelize/sequelize')

const Test = sequelize.define('Test', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: true,
        validate: {
            notNull: true,
            len : {
                args: [2, 60],
            }
        }
    },
    effectiveness: {
        type: Sequelize.DECIMAL(5,2),
        allowNull: false,
        validate: {
            notNull: true,
            isFloat: true,
            min: {
                args: [0],
            },
            max: {
                args: [100],
            },
            len: {
                args: [1, 5],
            }
        },
    },
    estimatedDuration: {
        type: Sequelize.TIME,
        allowNull: false,
        validate: {
            notNull: true,
            is: {
                args: [/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/i],
            }
        }
    },
    contraindications: {
        type: Sequelize.STRING(500),
        allowNull: true,
        validate: {
            len : {
                args: [0, 500],
            },
        }
    }
})

module.exports = Test