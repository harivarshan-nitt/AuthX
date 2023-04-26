const Client = require("../models/schema/clientApp");
const crypto = require("crypto");
const authorizeClientApp = async(req, res) => {
    try {
        const clientAppId = req.body.clientAppId
        const employeeId = req.jwt_payload.id
        const client = await Client.findOne({ clientAppId: clientAppId })
        if (client == null) {
            return res.status(404).json({
                message: "Client App does not exist"
            })
        }
        const auth_code = crypto.randomBytes(20).toString("hex")
        client.users.push({
            user: employeeId,
            auth_code
        })
        await client.save()
        return res.status(200).json({
            message: "Client app authorized to access user data",
            redirectUri: client.redirectUri,
            scope: client.scopes,
            auth_code
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}
module.exports = authorizeClientApp