const router = require("express").Router();
const { createJWT } = require("../helpers/jwt");
const Client = require("../models/schema/clientApp");

// Exchanging auth code for access token to access user data
router.post("/", async(req, res) => {
    try {
        const auth_code = req.body.auth_code
        const clientAppId = req.body.clientAppId
        const clientSecert = req.body.clientSecret
        const client = await Client.findOne({ clientAppId: clientAppId })
        if (client == null) {
            return res.status(404).json({
                message: "Client App does not exist"
            })
        }
        if (clientSecert != client.clientAppSecret) {
            return res.status(403).json({
                message: "Unauthorized access"
            })
        }
        const user = client.users.find(user => user.auth_code == auth_code)
        const access_token = createJWT({ id: user.user._id })
        return res.status(200).json({
            message: "Access token generated successfully",
            scope: client.scopes,
            access_token
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})
module.exports = router