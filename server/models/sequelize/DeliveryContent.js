const Sequelize = require('sequelize')
const sequelize = require('../../configs/sequelize/sequelize')

const DeliveryContent = sequelize.define('DeliveryContent', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    expiresAt: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notNull: true,
            isDate: true
        }
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
            isInt: true
        }
    },
    testId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
            isInt: true
        }
    },
    deliveryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
            isInt: true
        }
    },
})

module.exports = DeliveryContent