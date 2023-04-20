const jwt = require('jsonwebtoken');
const createJWT = (payload) => {
    const jwtSecretKey = process.env.JWTSECRET
    const token = jwt.sign(payload, jwtSecretKey)
    return token
}

const validateJWT = (token) => {
    const jwtSecretKey = process.env.JWTSECRET
    const decoded = jwt.verify(token, jwtSecretKey)
    return decoded
}

module.exports = {
    createJWT,
    validateJWT
}