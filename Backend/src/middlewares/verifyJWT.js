const { validateJWT } = require("../helpers/jwt")

const verifyJWT = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        const decoded = validateJWT(token)
        req.jwt_payload = decoded
        next()
    } catch (err) {
        res.status(401).json({
            message: "Auth failed"
        })
    }
}
module.exports = verifyJWT