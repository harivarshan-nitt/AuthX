const router = require("express").Router();
const authorizeClientApp = require("../services/authorizeClientApp");
// User authorizing an app 
router.get("/", async (req, res)=>{
    try{
        console.log(req.query)
        const clientAppId = req.query.clientAppID
        const client = await Client.findOne({ clientAppId: clientAppId })
        if (client == null) {
            return res.status(404).json({
                message: "Client App does not exist"
            })
        }
        return res.status(200).json({
            permissions: client.scopes,
            message: "success!"
        })
    }
    catch(err){
        res.status(500).json({
            message: "Internal Server Error!"   
        })
    }
})

router.post("/", authorizeClientApp)
module.exports = router