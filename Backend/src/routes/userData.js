const router = require("express").Router();
const getUserData = require("../services/getUserData");
router.get("/", getUserData);
module.exports = router