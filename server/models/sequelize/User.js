const Sequelize = require('sequelize')
const sequelize = require('../../configs/sequelize/sequelize')

const {hashPassword} = require('../../services/password-service')

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING('60'),
        allowNull: false,
        unique: true,
        validate: {
            notNull: true,
            len: [4, 60],
            is: {
                args: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i],
            }
        }
    },
    firstName: {
        type: Sequelize.STRING('30'),
        allowNull: false,
        validate: {
            notNull: true,
            len: [2, 30]
        }
    },
    lastName: {
        type: Sequelize.STRING('30'),
        allowNull: false,
        validate: {
            notNull: true,
            len: [2, 30]
        }
    },
    hashedPassword: {
        type: Sequelize.STRING(),
        allowNull: false,
        validate: {
            notNull: true,
            len : {
                args: [6],
            },
            is: {
                args: [".*[0-9].*"],
            },
            is: {
                args: [".*[A-Z].*"],
            }
        }
    },
    refreshToken: {
        type: Sequelize.STRING('36'),
        allowNull: true, 
        unique: true,
        validate: {
            len : {
                args: [36, 36],
            },
        }
    }, 
    refreshTokenExp: {
        type: Sequelize.DATE,
        allowNull: true, 
    }
}, {
    hooks: {
        beforeUpdate: async (user, options) => {
            user.hashedPassword = await hashPassword(user.hashedPassword.toString())
        },
        beforeCreate: async (user, options) => {
            user.hashedPassword = await hashPassword(user.hashedPassword.toString())
        },
    }
})


module.exports = User