const Sequelize = require('sequelize')
const sequelize = require('../../configs/sequelize/sequelize')

const Supplier = sequelize.define('Supplier', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            len : {
                args: [2, 60],
            },
        }
    },
    contactEmail: {
        type: Sequelize.STRING('60'),
        allowNull: false,
        validate: {
            notNull: true,
            len : {
                args: [4, 60],
            },
            is: {
                args: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i],
            }
        }
    },
})

module.exports = Supplier