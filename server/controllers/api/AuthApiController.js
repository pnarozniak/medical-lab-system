const {checkPassword} = require('../../services/password-service')
const UserRepository = require('../../repositories/sequelize/UserRepository')
const {generateAccessToken, generateRefreshToken} = require('../../services/jwt-service')

exports.login = async (req, res, next) => {
    if(!req.body.plainPassword || !req.body.email)
        return res.status(400).send()

    const user = await UserRepository.getUserByEmail(req.body.email)
    if (!user || !(await checkPassword(user.hashedPassword, req.body.plainPassword)))
        return res.status(400).send()
    

    req.user = user
    next()
}

exports.refresh = async (req, res, next) => { 
    if (!req.body.refreshToken)
        return res.status(401).send()

    const user = await UserRepository.getUserById(req.refreshingUser.id)
    if (!user || user.refreshToken !== req.body.refreshToken || user.refreshTokenExp < Date.now())
        return res.status(401).send()

    req.user = user

    next()
}

exports.attachTokensToResponse = async (req, res, next) => {
    const refreshToken = generateRefreshToken()
    const isSaved = await UserRepository.saveRefreshToken(req.user.id, refreshToken)
    if (!isSaved)
        return res.status(500).send()

    return res.status(200).json({
        
        accessToken: generateAccessToken(req.user.id, req.user.email, req.user.roles.map(userRole => userRole.role.name)),
        refreshToken: refreshToken
    })
}

exports.logout = async (req, res, next) => {
    const user = await UserRepository.getUserById(req.loggedUser.id)
    if (!user) return res.sendStatus(404)

    await UserRepository.deleteRefreshToken(req.loggedUser.id)
    return res.sendStatus(200)
}