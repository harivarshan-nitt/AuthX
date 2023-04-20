const Client = require("../models/schema/clientApp");
const getClientData = async(clientAppId) => {
    const client = await Client.findOne({ clientAppId })
    if (client == null) {
        return res.status(404).json({
            message: "Client App does not exist"
        })
    }
    return { client, error: null }
}
module.exports = getClientData