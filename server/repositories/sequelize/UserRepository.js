const User = require('../../models/sequelize/User')
const Role = require('../../models/sequelize/Role')
const UserRole = require('../../models/sequelize/UserRole')

exports.getUsers = () => {
    return User.findAll({attributes: ['id', 'firstName', 'lastName', 'email'], 
    include: [{
        model: UserRole,
        as: 'roles',
        include: [{
            model: Role,
            as: 'role'
        }]
    }]})
}

exports.deleteUser = (userId) => {
    return User.destroy({
        where: {id: userId}
    })
}

exports.getUserByEmail = async (email) => {
    const users = await User.findAll({where: {email: email}, include: [{
        model: UserRole,
        as: 'roles',
        include: [{
            model: Role,
            as: 'role'
        }]
    }]})

    if (!users || !users[0]) return null;

    return users[0]
}

exports.getUserById = async (id) => {
    const users = await User.findAll({where: {id: id}, include: [{
        model: UserRole,
        as: 'roles',
        include: [{
            model: Role,
            as: 'role'
        }]
    }]})

    if (!users || !users[0]) return null;

    return users[0]
}


exports.saveRefreshToken = async (idUser, refreshToken) => {
    const now = new Date()

    const rowsModified = await User.update(
        {
            refreshToken: refreshToken,
            refreshTokenExp: now.setSeconds(now.getSeconds() + parseInt(process.env.REFRESH_TOKEN_EXPIRATION_IN_SECONDS)),
        },
        {
            where: {id: idUser}
        }
    )

    return rowsModified > 0
}

exports.deleteRefreshToken = async (idUser) => {
    const rowsModified = await User.update(
        {
            refreshToken: null,
            refreshTokenExp: null,
        },
        {
            where: {id: idUser}
        }
    )

    return rowsModified > 0
}

exports.createUser = (newUser) => {
    let rolesToAdd = []
    return Role.findAll({where: {name: newUser.roles}})
        .then(roles => {
            if(!roles || roles.length === 0) return null;

            rolesToAdd = JSON.parse(JSON.stringify(roles))
            return User.create({...newUser})
        })
        .then(newUser => {
            const userRoles = rolesToAdd.map(r => {
                return {userId: newUser.id, roleId: r.id}
            })
            return UserRole.bulkCreate(userRoles)
                .then(_ => {
                    return newUser
                })
        })
}

//todo
exports.updateUser = (userId, updatedUser) => {
    let rolesToAdd = []
    return Role.findAll({where: {name: updatedUser.roles}})
        .then(roles => {
            if(!roles || roles.length === 0) return null;

            rolesToAdd = JSON.parse(JSON.stringify(roles))
            return User.update({...updatedUser}, {where: {id: userId},       
                individualHooks: true})
        })
        .then(([rowsModified]) => {
            if (rowsModified && rowsModified > 0) {
                return UserRole.destroy({where: {userId: userId}})
                .then(_ => {
                    const userRoles = rolesToAdd.map(r => {
                        return {userId: userId, roleId: r.id}
                    })

                    return UserRole.bulkCreate(userRoles)
                    .then(_ => {
                        return rowsModified
                    })
                })
            }

            return rowsModified
        })
}