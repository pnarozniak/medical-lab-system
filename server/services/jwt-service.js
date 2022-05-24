const jwt = require('jsonwebtoken')
const Guid = require('guid')

exports.generateAccessToken = (idUser, email, roles) => {
    return jwt.sign({id: idUser, email, roles}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION_IN });
}

exports.generateRefreshToken = () => {
    return Guid.raw()
}