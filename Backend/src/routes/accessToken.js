const router = require("express").Router();
const exchangeAuthCode = require("../services/exchangeAuthCode");

// Exchanging auth code for access token to access user data
router.post("/", exchangeAuthCode)
module.exports = router