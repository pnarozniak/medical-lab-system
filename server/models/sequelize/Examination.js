const Sequelize = require('sequelize')
const sequelize = require('../../configs/sequelize/sequelize')

const Examination = sequelize.define('Examination', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    arrangedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notNull: true,
            isDate: true
        }
    },
    referal: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: true
        }
    },
    result: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        validate: {}
    },
    patientId: {
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
})

module.exports = Examination