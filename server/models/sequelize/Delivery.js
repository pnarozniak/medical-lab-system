const Sequelize = require('sequelize')
const sequelize = require('../../configs/sequelize/sequelize')

const Delivery = sequelize.define('Delivery', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    plannedAt: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notNull: true,
            isDate: true
        }
    },
    deliveredAt: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true
        }
    },
    comments: {
        type: Sequelize.STRING(500),
        allowNull: true,
        validate: {
            len : {
                args: [0, 500],
            },
        }
    },
    supplierId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
            isInt: true
        }
    },
})

module.exports = Delivery