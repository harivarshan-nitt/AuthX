const router = require("express").Router();
const authorizeClientApp = require("../services/authorizeClientApp");
// User authorizing an app 
router.post("/", authorizeClientApp)
module.exports = router