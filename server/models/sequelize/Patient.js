const Sequelize = require('sequelize')
const sequelize = require('../../configs/sequelize/sequelize')

const Patient = sequelize.define('Patient', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING('30'),
        allowNull: false,
        validate: {
            notNull: true,
            len : {
                args: [2, 30],
            },
        }
    },
    lastName: {
        type: Sequelize.STRING('30'),
        allowNull: false,
        validate: {
            notNull: true,
            len : {
                args: [2, 30],
            }
        }
    },
    birthdate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notNull: true,
            isDate: true
        }
    },
    gender: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
            isIn: {
                args: [[1,2,9]],
            }
        }
    },
    email: {
        type: Sequelize.STRING('60'),
        allowNull: false,
        unique: true,
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
    phoneNumber: {
        type: Sequelize.STRING('9'),
        allowNull: true,
        validate: {
            isInt: true,
            len : {
                args: [9, 9],
            },
        }
    }
})

module.exports = Patient