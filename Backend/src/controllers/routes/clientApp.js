const ClientAppRouter = require("express").Router();
const crypto = require("crypto");
const ClientApp = require("../../models/schema/clientApp");

ClientAppRouter.post("/register", async (req, res) => {
  try {
    let  {name , description , redirectUri} = req.body;
    // yet to add scopes 
    if (!(typeof name === "string") || 
    !(typeof description === "string") ||
    !(typeof redirectUri === "string")
    ) return res.status(400).json({ message: "NOT IN REQUIRED FORMAT" });

    let clientApp = await ClientApp.findOne({
      name : name
    });

    if(clientApp != null) return res.status(400).json({ message: "CLIENT NAME EXISTS" });

    let newClientApp = await ClientApp.create({
       name : name,
       description : description,
       redirectUri :  redirectUri,
       clientAppId : crypto.randomBytes(10).toString("hex"),
       clientAppSecret : crypto.randomBytes(20).toString("hex"),
       scopes : []
    });

    return res.status(200).json({ message: "SUCCESS", cred : newClientApp });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "SERVER ERROR" });
  }
});

ClientAppRouter.post("/get", async (req, res) => {
  try {
    let  {clientAppId, clientAppSecret} = req.body;
    if (!(typeof clientAppId === "string") || 
    !(typeof clientAppSecret === "string")
    ) return res.status(400).json({ message: "NOT IN REQUIRED FORMAT" });

    let clientApp = await ClientApp.findOne({
       clientAppId : clientAppId,
       clientAppSecret : clientAppSecret,
    });

    if(clientApp == null) return res.status(401).json({ message: "INVALID CRED" });

    return res.status(200).json({ clientApp });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "SERVER ERROR" });
  }
});

ClientAppRouter.put("/", async (req, res) => {
  try {
    let  {clientAppId, clientAppSecret , description , redirectUri} = req.body;
    if (!(typeof clientAppId === "string") || 
    !(typeof clientAppSecret === "string") ||
    (
      !(typeof description === "string") &&
      !(typeof redirectUri === "string")
    )
    ) return res.status(400).json({ message: "NOT IN REQUIRED FORMAT" });

    let clientApp = await ClientApp.findOne({
       clientAppId : clientAppId,
       clientAppSecret : clientAppSecret,
    });

    if(clientApp == null) return res.status(401).json({ message: "INVALID CRED" });

    clientApp.description = description == null ? clientApp.description : description;
    clientApp.redirectUri = redirectUri == null ? clientApp.redirectUri : redirectUri;

    await clientApp.save();

    return res.status(200).json({ message: "UPDATE SUCCESS", clientApp });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "SERVER ERROR" });
  }
});

ClientAppRouter.delete("/", async (req, res) => {
  try {
    let  {clientAppId, clientAppSecret} = req.body;
    if (!(typeof clientAppId === "string") || 
    !(typeof clientAppSecret === "string")
    ) return res.status(400).json({ message: "NOT IN REQUIRED FORMAT" });

    let clientApp = await ClientApp.findOne({
       clientAppId : clientAppId,
       clientAppSecret : clientAppSecret,
    });

    if(clientApp == null) return res.status(401).json({ message: "INVALID CRED" });

    await ClientApp.deleteOne({_id : clientApp._id});

    return res.status(200).json({ message: "SUCCESSFULLY DELETED" });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "SERVER ERROR" });
  }
});

module.exports = ClientAppRouter;