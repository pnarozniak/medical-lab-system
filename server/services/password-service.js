const bcrypt = require('bcrypt')

exports.hashPassword = async (plainPassword) => {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    return hashedPassword
}

exports.checkPassword = async (hashedPassword, plainPassword) => {
    const isMatching = await bcrypt.compare(plainPassword, hashedPassword)
    return isMatching
}